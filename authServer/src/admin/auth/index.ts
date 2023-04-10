import validator from "validator";
import dotenv from "dotenv";
import bCrypt from "bcryptjs";
import { createError } from "../../utils";
import { getRefreshTokenData, newAccessToken, newRefreshToken } from "../jwt";
import { adminAppConfig } from "../../configs";
import { inputValidator } from "../validator";
import { adminRefreshTokensModel, adminUsersModel } from "../../services/mongoDb";
import { IAdminUser } from "../../services/mongoDb/defenition";

dotenv.config();

const config = adminAppConfig();

// create access token from refresh token
export const getNewAccessTokenFromRefreshToken = async (refreshToken: string) => {
  try {
    try {
      const tokenSavedInDB = await adminRefreshTokensModel.findOne({ value: refreshToken });
      if (!tokenSavedInDB) throw "Invalid refresh token";
    } catch (error) {
      throw typeof error == "string" ? createError(400, error) : "Faild to create token";
    }
    const payload: any = await getRefreshTokenData(refreshToken);
    // checks for user accessess
    await userAccessChecks(payload?.email);
    try {
      const accessToken = newAccessToken(payload);
      try {
        await adminUsersModel.updateOne(
          { email: payload?.email },
          {
            $set: {
              lastRefresh: new Date(),
            },
          }
        );
      } catch (error) {
        // Error occured while updating last refresh time
        console.log(error);
      }
      return accessToken;
    } catch (error) {
      throw createError(500, "Faild to create token");
    }
  } catch (error) {
    throw error;
  }
};

// check user access
export const userAccessChecks = async (email: string) => {
  let userData: any;
  try {
    try {
      userData = await adminUsersModel.findOne({ email: email });
    } catch (error) {
      throw createError(500, "Oops something went wrong, Try after some time");
    }
    if (!userData) throw createError(400, "Can't find user account with given data");
    if (userData.disabled) throw createError(403, "Disabled User");
  } catch (error) {
    throw error;
  }
  return userData;
};

export const checkPassword = async ({ email, password }: { email: string; password: string }) => {
  try {
    let userData: IAdminUser;
    try {
      userData = await adminUsersModel.findOne({ email: email });
    } catch (error) {
      throw createError(500, "Faild to fetch user data");
    }

    if (!userData) throw createError(400, "Account with this email not exist");

    // checkig if password is correct or not
    const matched = await bCrypt.compare(password, userData?.password ?? "");

    if (!matched) throw createError(400, "incorrect password");

    return userData;
  } catch (error) {
    throw error;
  }
};

export const signInUserWithPassword = async ({ email = "", password = "" }) => {
  try {
    // validating email and password requirements
    const data = await inputValidator({ email, password }, { email: true, password: true });
    const user = await checkPassword(data);

    // ----- TOKENS -----
    const tokensForUser = {
      accessToken: newAccessToken({ email: user.email }),
      refreshToken: newRefreshToken({ email: user.email }),
    };

    try {
      await adminUsersModel.updateOne({ email: user.email }, { $set: { lastLogin: new Date(), lastRefresh: new Date() } });
    } catch (error) {
      throw createError(500, "Faild to login, Error updating login status");
    }

    try {
      await new adminRefreshTokensModel({ value: tokensForUser.refreshToken, uid: user.uid }).save();
    } catch (error) {
      throw createError(500, "Faild to create tokes");
    }

    //  user data and tokes successfully created
    return {
      ...tokensForUser,
      email: user.email,
      photoURL: user.photoURL,
      name: user.name,
      phone: user.phone,
    };
  } catch (error) {
    throw error;
  }
};

export const getUserDataFromRefreshToken = async ({ refreshToken }) => {
  try {
    if (!validator.isJWT(refreshToken)) throw createError(400, "Invalid token");

    try {
      const tokenSavedInDB = await adminRefreshTokensModel.findOne({ value: refreshToken });
      if (!tokenSavedInDB) throw "Invalid refresh token";
    } catch (error) {
      throw typeof error == "string" ? createError(400, error) : "Faild to create token";
    }

    const tokenPayload: any = await getRefreshTokenData(refreshToken);
    // check user access or status
    let userData: any = await userAccessChecks(tokenPayload?.email);
    // get new access token
    const accessToken = newAccessToken({ email: tokenPayload?.email });
    //...
    return {
      uid: userData.uid,
      email: userData?.email,
      name: userData?.name,
      photoURL: userData?.photoURL,
      phone: userData?.phone,
      lastLogin: userData?.lastLogin,
      accessToken,
    };
  } catch (error) {
    throw error;
  }
};
export const updateUserDataWithEmail = async (email: string, data: { name: string; photoURL: string; phone: string }) => {
  try {
    await userAccessChecks(email);

    const validData = await inputValidator({ name: data.name, phone: data.phone, photoURL: data.photoURL });

    let dataToBeUpdated: { name: string; photoURL: string; phone: string } = {
      name: undefined,
      photoURL: undefined,
      phone: undefined,
    };

    if (validData.name) dataToBeUpdated.name = validData.name;
    if (validData.photoURL) dataToBeUpdated.photoURL = validData.photoURL;
    if (validData.phone) dataToBeUpdated.phone = validData.phone;

    try {
      await adminUsersModel.updateOne(
        { email },
        {
          $set: dataToBeUpdated,
        }
      );

      return { message: "user data updated successfully" };
    } catch (error) {
      throw createError(500, "Error while updating user data");
    }
  } catch (error) {
    throw error;
  }
};
