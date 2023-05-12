import { NextFunction, Response } from "express";
import { IRequest } from "../../../adapter/controllers/userController";

const mustLoginAsUser = async (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  if (req.user) next();
  else {
    res.status(401);
    res.send({ status: "error", message: "Unauthorized action" });
  }
};

export default mustLoginAsUser;
