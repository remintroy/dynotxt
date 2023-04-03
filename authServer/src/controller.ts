import { Response } from "express";
import { RequestDefention } from "./defenition";
import * as auth from "./app/auth.js";

// signUp && signIn
export const signInUser = async (req: RequestDefention, res: Response) => {
  try {
    const { accessToken, refreshToken, email, photoURL, name } = await auth.signInUser(req.body);
    let currentdate = new Date();
    let next3months = new Date(currentdate.setMonth(currentdate.getMonth() + 3));
    res.cookie("refreshToken", refreshToken, { httpOnly: true, secure: true, expires: next3months });
    res.send({ accessToken, email, photoURL, name });
  } catch (error) {
    res.status(error.code);
    res.send(error);
  }
};
