import tokensModel from "../models/tokens";
import { IToken } from "../models/tokens.schema";

export default function tokenRepositoryMongoDB() {
  const add = async (uid: string, token: string, optons?: object) => {
    return await new tokensModel({ uid, token, ...optons }).save();
  };
  const remove = async (data: IToken) => {
    return await tokensModel.deleteOne(data);
  };
  const getById = async (uid: string) => {
    return await tokensModel.findOne({ uid });
  };
  const getByToken = async (token: string) => {
    return await tokensModel.findOne({ value: token });
  };
  return {
    add,
    remove,
    getById,
    getByToken,
  };
}
