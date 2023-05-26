import { IToken } from "../../frameworks/databases/mongoDb/models/tokens.schema";
import tokenRepositoryImpl from "../../frameworks/databases/mongoDb/repository/tockensRepositoryImpl";

const tokenRepositoryInteraface = (respository: tokenRepositoryImpl) => {
  const add = respository.add;
  const addWithEmail = respository.addWithEmail;
  const getById = respository.getById;
  const getByToken = respository.getByToken;
  const remove = respository.remove;

  return {
    add,
    getById,
    getByToken,
    remove,
    addWithEmail,
  };
};

type tokenRepositoryInteraface = ReturnType<typeof tokenRepositoryInteraface>;
export default tokenRepositoryInteraface;
