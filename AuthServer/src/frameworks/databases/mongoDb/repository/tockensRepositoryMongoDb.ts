import tokensModel from "../models/tokens";
import { IToken } from "../models/tokens.schema";

export default class tokenRepositoryMongoDB {
  add = async (uid: string, token: string, optons?: object) => {
    return await new tokensModel({ uid, token, ...optons }).save();
  };
  remove = async (data: IToken) => {
    return await tokensModel.deleteOne(data);
  };
  getById = async (uid: string) => {
    return await tokensModel.findOne({ uid });
  };
  getByToken = async (token: string) => {
    return await tokensModel.findOne({ value: token });
  };
}
