import { getUtils } from "dynotxt-common-services";
import { NextFunction, Request, Response } from "express";

export default function (req: Request, res: Response, next: NextFunction) {
  try {
    if (req.headers.authorization?.split(" ")[0]!="Bearer") throw getUtils
    const token = req.headers.authorization?.split(" ")[1];
  } catch (error) {
    
  }
}
