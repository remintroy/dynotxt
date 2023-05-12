import { IUser } from "../../entities/user.normal";
import userRepositoryImpl from "../../frameworks/databases/mongoDb/repository/userRepositoryImpl";

const userRepositoryInteraface = (respository: userRepositoryImpl) => {
  const add = (data: IUser) => respository.add(data);
  const update = (uid: string, data: IUser) => respository.update(uid, data);
  const getById = (uid: string) => respository.getById(uid);
  const getByPageNo = (pageNo: number) => respository.getByPageNo(pageNo);
  const getByCustomQueryWithPageNo = (query: IUser, pageNo: number) =>
    respository.getByCustomQueryWithPageNo(query, pageNo);

  return {
    add,
    update,
    getById,
    getByPageNo,
    getByCustomQueryWithPageNo,
  };
};

type userRepositoryInteraface = ReturnType<typeof userRepositoryInteraface>;
export default userRepositoryInteraface;
