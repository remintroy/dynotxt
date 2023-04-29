import { Request, Response } from "express";

export default function makeExpressResponseCallback(controller) {
  return async (req: Request, res: Response) => {
    try {
      const response = await controller(req, res);
      res.send(response);
    } catch (error) {
      res.status(error?.code ? error.code : 500);
      res.send(error);
    }
  };
}
