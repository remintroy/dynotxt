import { Request, Response } from "express";

export default function notFoundError(req: Request, res: Response) {
  return res
    .status(404)
    .send({ message: "The service you requested was not found" });
}
