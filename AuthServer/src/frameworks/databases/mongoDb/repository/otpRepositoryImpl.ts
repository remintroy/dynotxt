import OptModel from "../models/otp";
import { IOtp } from "../models/otp.schema";

const otpRepositoryImpl = () => {
  const add = async (data: IOtp) => {
    const response = await new OptModel(data).save();
    return response;
  };
  const removeById = async (uid: string) => {
    const response = await OptModel.deleteOne({ uid });
    return response;
  };
  const removeByEmail = async (email: string) => {
    const response = await OptModel.deleteOne({ email });
    return response;
  };
  const getById = async (uid: string) => {
    const response = await OptModel.findOne({ uid });
    return response;
  };
  const getByEmail = async (email: string) => {
    const response = await OptModel.findOne({ email });
    return response;
  };
  const getByData = async (data: IOtp) => {
    const response = await OptModel.findOne(data);
    return response;
  };
  return {
    add,
    removeByEmail,
    removeById,
    getById,
    getByEmail,
    getByData,
  };
};

export default otpRepositoryImpl;
