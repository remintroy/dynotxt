import optModel from "../models/otp";
import { IOtp } from "../models/otp.schema";

export default class otpRepositoryMongoDB {
  add = async (data: IOtp) => {
    return await new optModel(data).save();
  };
  removeById = async (uid: string) => {
    return await optModel.deleteOne({ uid });
  };
  removeByEmail = async (email: string) => {
    return await optModel.deleteOne({ email });
  };
  getById = async (uid: string) => {
    return await optModel.findOne({ uid });
  };
  getByEmail = async (email: string) => {
    return await optModel.findOne({ email });
  };
}
