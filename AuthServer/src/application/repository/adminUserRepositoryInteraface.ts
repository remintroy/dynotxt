import { IAdminUser } from "../../frameworks/databases/mongoDb/models/admin.schema";
import adminUserRepositoryImpl from "../../frameworks/databases/mongoDb/repository/adminRepositoryImpl";

const adminUserRepositoryInteraface = (
  respository: ReturnType<typeof adminUserRepositoryImpl>
) => {
  const add = (data: IAdminUser) => respository.add(data);
  const update = (email: string, data: IAdminUser) =>
    respository.update(email, data);
  const getByEmail = (email: string) => respository.getByEmail(email);

  return {
    add,
    update,
    getByEmail,
  };
};

export default adminUserRepositoryInteraface;
