import { NextFunction, Response } from "express";
import { RequestDefention } from "../../defenition";
import { getAccessTokenData } from "../jwt";
import { users } from "../../services/mongoDb";

// function that runs on every request
export const authInit = async (req: RequestDefention, res: Response, next: NextFunction) => {
  try {
    const payload: any = await getAccessTokenData(req.headers["authorization"]?.split(" ")[1]);
    // gets curresponding user data from server if user exist's
    req.user = await users.findOne({ uid: payload?.uid }, { password: 0, _id: 0 });
    // check for blocked user
    if (req.user.disabled) throw "This user is disabled";
    // check if this is an admin account
    if (req.user?.admin) req.admin = req.user;
  } catch (error) {
    req.user = null;
  }
  next();
};

// check and make sure admin is logged in
export const mustLoginAsAdmin = async (req: RequestDefention, res: Response, next: NextFunction) => {
  if (req.admin) next();
  else {
    res.status(401);
    res.send({ status: "error", message: "Unauthorized action" });
  }
};

// check and maker sure user is logged in
export const mustLoginAsUser = async (req: RequestDefention, res: Response, next: NextFunction) => {
  if (req.user) next();
  else {
    res.status(401);
    res.send({ status: "error", message: "Unauthorized action" });
  }
};
