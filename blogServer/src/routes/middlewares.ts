import { NextFunction, Response } from "express";
import { jwt } from "../services";
import { IRequest } from "../controllers/types";

export const authInit = async (req: IRequest, res: Response, next: NextFunction) => {
  const accessToken = req.headers.authorization?.split(" ")[1];
  try {
    const payload = jwt.verifyAssessToken(accessToken);
    req.user = payload?.uid;
  } catch (error) {
    req.user = null;
  }
  next();
};

export const mustLogin = async (req: IRequest, res: Response, next: NextFunction) => {
  if (req.user) next();
  else res.status(401).send({ code: 401, message: "UnAuthorized", error: "Unauthorized" });
};
