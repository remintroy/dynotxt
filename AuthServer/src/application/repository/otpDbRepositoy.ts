import { IOtp } from "../../frameworks/databases/mongoDb/models/otp.schema";
import otpRepositoryMongoDB from "../../frameworks/databases/mongoDb/repository/otpRepositoyMongoDb";

export default class otpDbRepository {
  private _respository: otpRepositoryMongoDB;
  constructor(respository: otpRepositoryMongoDB) {
    this._respository = respository;
  }
  add = (data: IOtp) => this._respository.add(data);
  removeById = (uid: string) => this._respository.removeById(uid);
  removeByEmail = (email: string) => this._respository.removeByEmail(email);
  getById = (uid: string) => this._respository.getById(uid);
  getByEmail = (email: string) => this._respository.getByEmail(email);
}
