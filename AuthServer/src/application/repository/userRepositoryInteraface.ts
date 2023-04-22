import { IUser } from "../../entities/user.normal";
import userRepositoryImpl from "../../frameworks/databases/mongoDb/repository/userRepositoryImpl";

const userRepositoryInteraface = (
  respository: ReturnType<typeof userRepositoryImpl>
) => {
  const add = (data: IUser) => respository.add(data);
  const update = (uid: string, data: IUser) => respository.update(uid, data);
  const getById = (uid: string) => respository.getById(uid);

  return {
    add,
    update,
    getById,
  };
};

export default userRepositoryInteraface;
