import { IUser } from "../../../../entities/user.normal";
import UserModel from "../models/user";

const userRepositoryImpl = () => {
  const add = async (user: IUser) => {
    const response = new UserModel(user).save();
    return response;
  };
  const update = async (uid: string, data: IUser) => {
    const response = await UserModel.updateOne(
      { uid },
      {
        $set: data,
      }
    );
    return response;
  };
  const getById = async (uid: string) => {
    const response = await UserModel.findOne({ uid });
    return response;
  };

  const getByPageNo = async (page: number) => {
    const response = await UserModel.paginate({}, { page, limit: 20 });
    return response;
  };

  const getByCustomQueryWithPageNo = async (query: IUser, page: number) => {
    const response = await UserModel.paginate(query, { page, limit: 20 });
    return response;
  };
  return {
    add,
    update,
    getById,
    getByPageNo,
    getByCustomQueryWithPageNo,
  };
};

export default userRepositoryImpl;
