import { NextFunction, Response } from "express";
import { RequestWithUser } from "../express";

const mustLoginAsAdmin = async (
  req: RequestWithUser,
  res: Response,
  next: NextFunction
) => {
  if (req.admin) next();
  else {
    res.status(401);
    res.send({ status: "error", message: "Unauthorized action" });
  }
};

export default mustLoginAsAdmin;
