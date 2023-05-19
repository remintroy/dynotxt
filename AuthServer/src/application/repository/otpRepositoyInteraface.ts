import { IOtp } from "../../frameworks/databases/mongoDb/models/otp.schema";
import otpRepositoryImpl from "../../frameworks/databases/mongoDb/repository/otpRepositoryImpl";

const otpRepositoryInterface = (respository: otpRepositoryImpl) => {
  const add = respository.add;
  const removeById = respository.removeById;
  const removeByEmail = respository.removeByEmail;
  const getById = respository.getById;
  const getByEmail = respository.getByEmail;
  const getByData = respository.getByData;

  return {
    add,
    removeById,
    removeByEmail,
    getById,
    getByEmail,
    getByData,
  };
};

type otpRepositoryInterface = ReturnType<typeof otpRepositoryInterface>;
export default otpRepositoryInterface;
