import { IToken } from "../../frameworks/databases/mongoDb/models/tokens.schema";
import tokenRepositoryMongoDB from "../../frameworks/databases/mongoDb/repository/tockensRepositoryMongoDb";

export default class tokenDbRepository {
  private _respository: tokenRepositoryMongoDB;

  constructor(respository: tokenRepositoryMongoDB) {
    this._respository = respository;
  }

  add = (uid: string, token: string, options?: object) => this._respository.add(uid, token, options);
  getById = (uid: string) => this._respository.getById(uid);
  getByToken = (token: string) => this._respository.getByToken(token);
  remove = (data: IToken) => this._respository.remove(data);
}
