import { User } from "../../entities/user.normal";
import userRepositoryImpl from "../../frameworks/databases/mongoDb/repository/userRepositoryImpl";

const userRepositoryInteraface = (respository: userRepositoryImpl) => {
  const add = respository.add;
  const update = respository.update;
  const getById = respository.getById;
  const getByPageNo = respository.getByPageNo;
  const getByCustomQueryWithPageNo = respository.getByCustomQueryWithPageNo;

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
