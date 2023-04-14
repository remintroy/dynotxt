import { Response } from "express";
import { RequestDefention } from "./types";
import {
  getNewAccessTokenFromRefreshToken,
  getUserDataFromRefreshToken,
  signInUserWithTokenId,
  updateUserDataWithUid,
} from "./auth";
import { createError } from "dynotxt-common-services/utils/";
import { refreshTokensModel } from "../services/mongoDb";
import { checkOtpExists, verifyOtp } from "./otp";

// signUp && signIn
export const signInUser = async (req: RequestDefention, res: Response) => {
  try {
    const { accessToken, refreshToken, email, photoURL, name } = await signInUserWithTokenId(req.body);
    let currentdate = new Date();
    let next3months = new Date(currentdate.setMonth(currentdate.getMonth() + 3));
    res.cookie("refreshToken", refreshToken, { httpOnly: true, secure: true, expires: next3months });
    res.send({ accessToken, email, photoURL, name });
  } catch (error) {
    res.status(error.code);
    res.send(error);
  }
};

// user data
export const getUserData = async (req: RequestDefention, res: Response) => {
  try {
    const refreshToken = req.cookies?.refreshToken;
    if (!refreshToken) throw createError(401, "Unauthenticated");
    const data = await getUserDataFromRefreshToken({ refreshToken });
    res.send(data);
  } catch (error) {
    res.status(error?.code ? error.code : 401);
    res.send(error);
  }
};

// gets new access token from refresh token
export const getNewAccessToken = async (req: RequestDefention, res: Response) => {
  try {
    const refreshToken = req.cookies?.refreshToken;
    if (!refreshToken) throw createError(401, "Unauthenticated");
    const data = await getNewAccessTokenFromRefreshToken(refreshToken);
    res.send(data);
  } catch (error) {
    res.status(error?.code ? error.code : 401);
    res.send(error);
  }
};

export const updateUserData = async (req: RequestDefention, res: Response) => {
  try {
    const uid = req.user?.uid;
    if (!uid) throw createError(400, "Uid is required");
    const data = req.body;
    const response = await updateUserDataWithUid(uid, data);
    res.send(response);
  } catch (error) {
    res.status(error?.code ? error.code : 401);
    res.send(error);
  }
};

export const logoutUser = async (req: RequestDefention, res: Response) => {
  try {
    const refreshToken = req.cookies?.refreshToken;
    const user = req.user;
    if (!user) throw createError(400, "Login to logout!");

    try {
      const data = await refreshTokensModel.deleteOne({ uid: user?.uid, value: refreshToken });
    } catch (error) {
      throw createError(500, "Faild while logging out");
    }

    res.cookie("refreshToken", "");

    res.send({ message: "logged out successfully" });
  } catch (error) {
    res.status(error.code || 500).send(error);
  }
};

export const verifyEmailPageAuth = async (req: RequestDefention, res: Response) => {
  try {
    const uid = req.params.uid;
    if (!uid) throw createError(400, "Uid is required");
    const data = await checkOtpExists(uid, "signin/emailVerify");
    if (!data) throw createError(404, "Page you are looking for does not exist!");
    res.send({ uid: data.uid });
  } catch (error) {
    res.status(error.code || 500).send(error);
  }
};

export const verifyEmailForAuth = async (req: RequestDefention, res: Response) => {
  try {
    const uid = req.body.uid;
    const otp = req.body.otp;
    if (!uid) throw createError(400, "UID is required");
    if (!otp) throw createError(400, "OTP is required");
    const data = await verifyOtp(uid, otp, "signin/emailVerify");
    let currentdate = new Date();
    let next3months = new Date(currentdate.setMonth(currentdate.getMonth() + 3));
    res.cookie("refreshToken", data.refreshToken, { httpOnly: true, secure: true, expires: next3months });
    res.send(data);
  } catch (error) {
    res.status(error.code || 500).send(error);
  }
};
