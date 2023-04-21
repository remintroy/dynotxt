import { IUser } from "../../entities/user.normal";
import userRepositoryMongoDB from "../../frameworks/databases/mongoDb/repository/userRepositoryMongoDb";

export default class useDbrRepository {
  private _repository: userRepositoryMongoDB;

  constructor(respository: userRepositoryMongoDB) {
    this._repository = respository;
  }

  add = (data: IUser) => this._repository.add(data);
  update = (uid: string, data: IUser) => this._repository.update(uid, data);
  getById = (uid: string) => this._repository.getById(uid);
}
