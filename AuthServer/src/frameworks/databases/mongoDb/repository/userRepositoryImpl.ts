import { User } from "../../../../entities/user.normal";
import UserModel from "../models/user";

const userRepositoryImpl = () => {
  const add = async (user: User) => {
    const response = new UserModel(user).save();
    return response;
  };
  const update = async (uid: string, data: User) => {
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

  const getByCustomQueryWithPageNo = async (query: User, page: number) => {
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

type userRepositoryImpl = ReturnType<typeof userRepositoryImpl>;
export default userRepositoryImpl;
