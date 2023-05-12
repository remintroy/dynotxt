import TokensModel from "../models/tokens";
import { IToken } from "../models/tokens.schema";

const tokenRepositoryImpl = () => {
  const add = async (uid: string, token: string, optons?: object) => {
    const response = await new TokensModel({
      uid,
      value: token,
      ...optons,
    }).save();
    return response;
  };

  const remove = async (data: IToken) => {
    const response = await TokensModel.deleteOne(data);
    return response;
  };

  const getById = async (uid: string) => {
    const response = await TokensModel.findOne({ uid });
    return response;
  };

  const getByToken = async (token: string) => {
    const response = await TokensModel.findOne({ value: token });
    return response;
  };

  const addWithEmail = async (
    email: string,
    token: string,
    optons?: object
  ) => {
    const response = await new TokensModel({
      uid: email,
      value: token,
      ...optons,
    }).save();
    return response;
  };

  return {
    add,
    remove,
    getById,
    getByToken,
    addWithEmail,
  };
};

type tokenRepositoryImpl = ReturnType<typeof tokenRepositoryImpl>
export default tokenRepositoryImpl;
