import { NextFunction, Response } from "express";
import { RequestDefention } from "../defenition";
import { getAccessTokenData } from "../jwt";
import { adminUsersModel } from "../../services/mongoDb";

// function that runs on every request
export const authInit = async (req: RequestDefention, res: Response, next: NextFunction) => {
  try {
    const payload: any = await getAccessTokenData(req.headers["authorization"]?.split(" ")[1]);
    // gets curresponding user data from server if user exist's
    req.admin = await adminUsersModel.findOne({ email: payload?.email }, { password: 0, _id: 0 });
    // check for blocked user
    if (req.admin.disabled) throw "This user is disabled";
  } catch (error) {
    req.admin = null;
  }
  next();
};

// check and maker sure user is logged in
export const mustLoginAsUser = async (req: RequestDefention, res: Response, next: NextFunction) => {
  if (req.admin) next();
  else {
    res.status(401);
    res.send({ status: "error", message: "Unauthorized action" });
  }
};
