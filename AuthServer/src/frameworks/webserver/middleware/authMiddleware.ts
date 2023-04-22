import { NextFunction, Response } from "express";
import {
  userJwtService,
  utilService,
} from "../../../application/services/commonServices";
import userRepositoryInteraface from "../../../application/repository/userRepositoryInteraface";
import userRepositoryImpl from "../../databases/mongoDb/repository/userRepositoryImpl";
import { IRequest } from "../../../adapter/controllers/userController";

const { createError } = utilService;
const userRepository = userRepositoryInteraface(userRepositoryImpl());
const jwt = userJwtService;

export default async function authMiddleware(
  req: IRequest,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  res: Response,
  next: NextFunction
) {
  try {
    if (req.headers.authorization?.split(" ")[0] !== "Bearer")
      throw createError(400, "Invalid authorization token type");
    const token = req.headers.authorization?.split(" ")[1];
    const { uid } = jwt.verifyAssessToken(token);

    if (uid) {
      req.user = await userRepository.getById(uid);
      if (req.user.disabled) req.user = null;
    }
  } catch (error) {
    req.user = null;
  }
  next();
}
