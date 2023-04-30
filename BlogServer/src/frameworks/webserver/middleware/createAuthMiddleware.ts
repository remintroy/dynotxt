import { NextFunction, Response } from "express";
import { RequestWithUser } from "../express";
// eslint-disable-next-line import/order
import jwtService from "dynotxt-common-services/jwt";

const createAuthMiddleware = (userJwt: jwtService, adminJwt: jwtService) => {
  return async (req: RequestWithUser, res: Response, next: NextFunction) => {
    try {
      const accessToken = req.headers.authorization?.split(" ")[1];
      try {
        const { uid } = await userJwt.verifyAssessToken(accessToken);
        req.user = uid || null;
      } catch (error) {
        req.user = null;
      }
      try {
        const { email } = await adminJwt.verifyAssessToken(accessToken);
        req.admin = email || null;
      } catch (error) {
        req.admin = null;
      }
    } catch (error) {
      req.user = null;
      req.admin = null;
    }
    next();
  };
};

export default createAuthMiddleware;
