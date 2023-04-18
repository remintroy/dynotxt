import { Request } from "express";
import { IUser } from "../models/user.types";

export interface IRequest extends Request {
  user: IUser;
}
