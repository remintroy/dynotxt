import { IToken } from "../../frameworks/databases/mongoDb/models/tokens.schema";
import tokenRepositoryMongoDB from "../../frameworks/databases/mongoDb/repository/tockensRepositoryMongoDb";

export default function tokenDbRepository(respository) {
  // const respository = getRespository();

  const add = (uid: string, token: string, options?: object) => respository.add(uid, token, options);
  const getById = (uid: string) => respository.getById(uid);
  const getByToken = (token: string) => respository.getByToken(token);
  const remove = (data: IToken) => respository.remove(data);

  return {
    add,
    remove,
    getByToken,
    getById,
  };
}
