import validator from "validator";
import dotenv from "dotenv";
import { createError } from "dynotxt-common-services/utils/";
import { getEmail } from "dynotxt-common-services/";
import { getRefreshTokenData, newAccessToken, newRefreshToken } from "./jwt";
import { refreshTokensModel, usersModel } from "../services/mongoDb";
import { verifyIdToken } from "../services/firebase";
import { IUser } from "../services/mongoDb/types";
import { serverConfig } from "../configs";
import { createOtp } from "./otp";

dotenv.config();
const config = serverConfig();
const email = getEmail(config.email.user, config.email.pass);

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
    await userAccessChecks(payload?.uid);
    try {
      const accessToken = newAccessToken(payload);
      try {
        await usersModel.updateOne(
          { uid: payload?.uid },
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
export const userAccessChecks = async (uid: string, data?: IUser | null) => {
  let userData: IUser;
  try {
    if (data) userData = data;
    else {
      try {
        userData = await usersModel.findOne({ uid: uid });
      } catch (error) {
        throw createError(500, "Oops something went wrong, Try after some time");
      }
    }
    if (!userData) throw createError(400, "Can't find user account with given data");
    if (userData.disabled) throw createError(403, "Disabled User");
  } catch (error) {
    throw error;
  }
  return userData;
};

export const tokensForUser = async (uid: string) => {
  // ----- TOKENS -----
  const tokensForUser = {
    accessToken: newAccessToken({ uid }),
    refreshToken: newRefreshToken({ uid }),
  };

  try {
    await new refreshTokensModel({ value: tokensForUser.refreshToken, uid }).save();
  } catch (error) {
    throw createError(500, "Faild to create tokes");
  }

  return tokensForUser;
};

// login user if exist or create new
export const signInUserWithTokenId = async ({ idToken }: { idToken: string }) => {
  try {
    if (!validator.isJWT(idToken + "")) throw createError(400, "Invalid idToken");

    // verfy idToken and retrive userData from firebase
    const user = await verifyIdToken({ idToken });

    // check for existing data
    let existingData: IUser | null;
    try {
      existingData = await usersModel.findOne({ uid: user.uid });
    } catch (error) {
      throw createError(500, "Faild to fetch user data");
    }
    if (!existingData) {
      // creates and saves new user
      const newUserData = {
        uid: user.uid,
        name: user.displayName,
        email: user.email,
        provider: user.providerData[0].providerId,
        createdAt: user.metadata.creationTime,
        lastLogin: user.metadata.lastSignInTime,
        lastRefresh: user.metadata.lastRefreshTime,
        photoURL: user.photoURL,
        phone: user.phoneNumber,
        disabled: user.disabled,
      };
      const newUser = new usersModel(newUserData);
      try {
        await newUser.save();
      } catch (error) {
        throw createError(500, "Error creating user");
      }
    }

    if (!existingData || !existingData.emailVerified) {
      const otp = await createOtp(user.uid, "signin/emailVerify");
      try {
        await email.sendOtp(user.email, `${otp}`);
      } catch (error) {
        throw createError(500, "Error while sending otp. Please try after sometime.");
      }
      throw createError(403, "You must verify your email to login", {
        url: `${config.appBaseUrl}/verify-email/${user.uid}`,
      });
    }

    // ----- TOKENS -----
    const tokens = await tokensForUser(user.uid);

    try {
      await usersModel.updateOne({ uid: user.uid }, { $set: { lastLogin: new Date() } });
    } catch (error) {
      throw createError(500, "Faild to login, Error updating login status");
    }

    // user data and tokes successfully created
    return { ...tokens, email: user.email, photoURL: user.photoURL, name: user.displayName };
  } catch (error) {
    throw error;
  }
};

export const getUserDataFromRefreshToken = async ({ refreshToken }) => {
  try {
    if (!validator.isJWT(refreshToken)) throw createError(400, "Invalid token");
    try {
      const tokenSavedInDB = await refreshTokensModel.findOne({ value: refreshToken });
      if (!tokenSavedInDB) throw "Invalid refresh token";
    } catch (error) {
      throw typeof error == "string" ? createError(400, error) : "Faild to create token";
    }
    const tokenPayload: any = await getRefreshTokenData(refreshToken);
    // check user access or status
    let userData: any = await userAccessChecks(tokenPayload?.uid);
    // get new access token
    const accessToken = newAccessToken({ uid: tokenPayload?.uid });
    //...
    return {
      uid: userData.uid,
      email: userData?.email,
      name: userData?.name,
      photoURL: userData?.photoURL,
      phone: userData?.phone,
      referal: userData?.referal,
      lastLogin: userData?.lastLogin,
      dob: userData?.dob,
      gender: userData?.gender,
      privateAccount: userData?.privateAccount,
      accessToken,
    };
  } catch (error) {
    throw error;
  }
};

interface IUpdateUserInput {
  name: string;
  photoURL: string;
  phone: string;
  dob: string;
  gender: string;
  privateAccount: boolean | string;
}

export const updateUserDataWithUid = async (uid: string, data?: IUpdateUserInput) => {
  try {
    await userAccessChecks(uid);

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

    if (data?.dob) {
      if (!validator.isDate(data.dob)) throw createError(400, "Invalid date");
    }

    if (data?.gender) {
      if (data.gender != "male" && data.gender != "female" && data.gender != "other")
        throw createError(400, "Invalid gender");
    }

    let dataToBeUpdated: IUpdateUserInput = {
      name: undefined,
      photoURL: undefined,
      phone: undefined,
      dob: undefined,
      privateAccount: undefined,
      gender: undefined,
    };

    if (data.name) dataToBeUpdated.name = data.name;
    if (data.photoURL) dataToBeUpdated.photoURL = data.photoURL;
    if (data.phone) dataToBeUpdated.phone = data.phone;
    if (data.dob) dataToBeUpdated.dob = data.dob;
    if (data.gender) dataToBeUpdated.gender = data.gender;
    if (data.privateAccount) dataToBeUpdated.privateAccount = data.privateAccount == "true";

    try {
      await usersModel.updateOne(
        { uid },
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
