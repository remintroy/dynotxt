import { Response } from "express";
import { RequestDefention } from "../defenition";
import { getUserDataFromRefreshToken, signInUserWithPassword } from "../auth";
import { createError } from "../../utils";

export const userSignIn = async (req: RequestDefention, res: Response) => {
  try {
    const { accessToken, refreshToken, email, photoURL, name } = await signInUserWithPassword(req.body);
    let currentdate = new Date();
    let next3months = new Date(currentdate.setMonth(currentdate.getMonth() + 3));
    res.cookie("suRefreshToken", refreshToken, { httpOnly: true, secure: true, expires: next3months });
    res.send({ accessToken, email, photoURL, name });
  } catch (error) {
    res.status(error?.code ? error.code : 500);
    res.send(error);
  }
};

export const getUserData = async (req: RequestDefention, res: Response) => {
  try {
    const refreshToken = req.cookies?.suRefreshToken;
    if (!refreshToken) throw createError(401, "Unauthenticated");
    const data = await getUserDataFromRefreshToken({ refreshToken });
    res.send(data);
  } catch (error) {
    res.status(error?.status ? error.status : 401);
    res.send(error);
  }
};
