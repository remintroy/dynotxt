import optModel from "../models/otp";
import { IOtp } from "../models/otp.schema";

export default function otpRepositoryMongoDB() {
  const add = async (data: IOtp) => {
    return await new optModel(data).save();
  };
  const removeById = async (uid: string) => {
    return await optModel.deleteOne({ uid });
  };
  const removeByEmail = async (email: string) => {
    return await optModel.deleteOne({ email });
  };
  const getById = async (uid: string) => {
    return await optModel.findOne({ uid });
  };
  const getByEmail = async (email: string) => {
    return await optModel.findOne({ email });
  };
  return {
    add,
    removeById,
    removeByEmail,
    getById,
    getByEmail
  };
}
