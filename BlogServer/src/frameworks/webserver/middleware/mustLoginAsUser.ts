import { NextFunction, Response } from "express";
import { RequestWithUser } from "../express";

const mustLoginAsUser = async (
  req: RequestWithUser,
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
