import { IOtp } from "../../frameworks/databases/mongoDb/models/otp.schema";

export default function otpDbRepository(respository) {
  // const respository = getRespository();

  const add = (data: IOtp) => respository.add(data);
  const removeById = (uid: string) => respository.removeById(uid);
  const removeByEmail = (email: string) => respository.removeByEmail(email);
  const getById = (uid: string) => respository.getById(uid);
  const getByEmail = (email: string) => respository.getByEmail(email);

  return {
    add,
    removeById,
    removeByEmail,
    getById,
    getByEmail,
  };
}
