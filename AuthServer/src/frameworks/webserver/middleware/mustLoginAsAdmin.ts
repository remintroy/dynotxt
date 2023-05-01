import { NextFunction, Response } from "express";
import { IRequest } from "../../../adapter/controllers/adminController";

const mustLoginAsAdmin = async (
  req: IRequest,
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
