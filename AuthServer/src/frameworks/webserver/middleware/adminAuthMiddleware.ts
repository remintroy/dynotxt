import { NextFunction, Response } from "express";
import {
  adminJwtService,
  utilService,
} from "../../../application/services/commonServices";
import { IRequest } from "../../../adapter/controllers/adminController";
import adminUserRepositoryInteraface from "../../../application/repository/adminUserRepositoryInteraface";
import adminUserRepositoryImpl from "../../databases/mongoDb/repository/adminRepositoryImpl";

const { createError } = utilService;
const userRepository = adminUserRepositoryInteraface(adminUserRepositoryImpl());
const jwt = adminJwtService;

export default async function adminAuthMiddleware(
  req: IRequest,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  res: Response,
  next: NextFunction
) {
  try {
    if (!(req.headers.authorization?.split(" ")[0].trim() === "Bearer"))
      throw createError(400, "Invalid authorization token type");
    const token = req.headers.authorization?.split(" ")[1]?.trim();
    const { email } = jwt.verifyAssessToken(token);
    if (email) {
      req.admin = await userRepository.getByEmail(email);
      if (req.admin.disabled) req.admin = null;
    }
  } catch (error) {
    req.admin = null;
  }

  next();
}
