import { appConfig } from "../configs";
import { otpModel, usersModel } from "../services/mongoDb";
import { IOtp, IUser } from "../services/mongoDb/types";
import { createError } from "../utils";
import randomId from "random-id";
import { tokensForUser } from "./auth";

const config = appConfig();

export const createOtp = async (uid: string, reason: string) => {
  try {
    const existingData = await otpModel.findOne({ uid: uid });
    const otp = existingData ? existingData.otp : randomId(6, "A0");
    if (!existingData) await new otpModel({ uid: uid, otp: otp, reason }).save();
    return otp;
  } catch (error) {
    throw createError(500, "Faild to fetch otp related information");
  }
};

export const checkOtpExists = async (uid: string, reason: string) => {
  try {
    return await otpModel.findOne({ uid, reason });
  } catch (error) {
    throw createError(500, "Faild to load nessory data");
  }
};

export const verifyOtp = async (uid: string, otp: string, reason: string) => {
  try {
    let data: IOtp;
    try {
      data = await otpModel.findOne({ uid, otp, reason });
    } catch (error) {
      throw createError(500, "Faild to validate otp");
    }

    if (!data) throw createError(400, "Invalid otp");

    let userData: IUser;
    try {
      await usersModel.updateOne(
        { uid },
        {
          $set: { emailVerified: true },
        }
      );
      userData = await usersModel.findOne({ uid }, config.db.userProjection);
    } catch (error) {
      throw createError(500, "Faild to validate otp");
    }

    try {
      await otpModel.deleteOne({ uid, otp, reason });
    } catch (error) {
      console.log(error);
    }

    const tokens = await tokensForUser(uid);

    try {
      await usersModel.updateOne({ uid: uid }, { $set: { lastLogin: new Date() } });
    } catch (error) {
      throw createError(500, "Faild to login, Error updating login status");
    }

    return { ...tokens, email: userData.email, photoURL: userData.photoURL, name: userData.name };
  } catch (error) {
    console.log(error);
    throw error;
  }
};
