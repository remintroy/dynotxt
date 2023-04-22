import { NextFunction, Request, Response } from "express";

export default function userAccessControl(controller) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Check if user is disabled
      // Check if user is
      const response = await controller(req);
      res.send(response);
    } catch (error) {
      res.status(error?.code ? error.code : 500);
      res.send(error);
    }
  };
}
