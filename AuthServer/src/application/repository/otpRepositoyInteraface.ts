import { IOtp } from "../../frameworks/databases/mongoDb/models/otp.schema";
import otpRepositoryImpl from "../../frameworks/databases/mongoDb/repository/otpRepositoryImpl";

const otpRepositoryInterface = (
  respository: ReturnType<typeof otpRepositoryImpl>
) => {
  const add = (data: IOtp) => respository.add(data);
  const removeById = (uid: string) => respository.removeById(uid);
  const removeByEmail = (email: string) => respository.removeByEmail(email);
  const getById = (uid: string) => respository.getById(uid);
  const getByEmail = (email: string) => respository.getByEmail(email);
  const getByData = (data: IOtp) => respository.getByData(data);

  return {
    add,
    removeById,
    removeByEmail,
    getById,
    getByEmail,
    getByData,
  };
};

export default otpRepositoryInterface;
