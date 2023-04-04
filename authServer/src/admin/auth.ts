import validator from "validator";
import dotenv from "dotenv";
import bCrypt from "bcryptjs";
import { createError } from "../utils";
import { usersModel, refreshTokensModel } from "./services/mongoDb";
import { getRefreshTokenData, newAccessToken, newRefreshToken } from "./jwt";
import { adminAppConfig } from "../configs";
import { inputValidator } from "./validator";
import { IUser } from "./services/mongoDb/schema";

dotenv.config();

const config = adminAppConfig();

// create access token from refresh token
export const getNewAccessTokenFromRefreshToken = async (refreshToken: string) => {
  try {
    try {
      const tokenSavedInDB = await refreshTokensModel.findOne({ value: refreshToken });
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
        await usersModel.updateOne(
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
      userData = await usersModel.findOne({ email: email });
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
    let userData: IUser;
    try {
      userData = await usersModel.findOne({ email: email });
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
      await usersModel.updateOne({ email: user.email }, { $set: { lastLogin: new Date(), lastRefresh: new Date() } });
    } catch (error) {
      throw createError(500, "Faild to login, Error updating login status");
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
    const tokenPayload: any = await getRefreshTokenData(refreshToken);
    // check user access or status
    let userData: IUser = await userAccessChecks(tokenPayload?.email);
    // get new access token
    const accessToken = newAccessToken({ email: tokenPayload?.email });
    //...
    return {
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

    if (data?.name) {
      if (typeof data.name != "string") throw createError(400, "Enter a valid name");
      data.name = data.name?.trim();
      if (data.name.length < 1) throw createError(400, "Invalid name");
    }

    if (data?.photoURL) {
      if (typeof data.photoURL != "string") throw createError(400, "Invalid ImgURL");
      data.photoURL = data.photoURL?.trim();
      if (!validator.isURL(data.photoURL)) throw createError(400, "Invalid URL");
    }

    if (data?.phone) {
      if (!validator.isMobilePhone(data?.phone)) throw createError(400, "Invalid phone number");
      data.phone = data?.phone?.trim();
    }

    let dataToBeUpdated: { name: string; photoURL: string; phone: string } = {
      name: undefined,
      photoURL: undefined,
      phone: undefined,
    };

    if (data.name) dataToBeUpdated.name = data.name;
    if (data.photoURL) dataToBeUpdated.photoURL = data.photoURL;
    if (data.phone) dataToBeUpdated.phone = data.phone;

    try {
      await usersModel.updateOne(
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
