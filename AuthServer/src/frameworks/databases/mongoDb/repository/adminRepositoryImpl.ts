import AdminUserModel from "../models/admin";
import { AdminUser } from "../models/admin.schema";

const adminUserRepositoryImpl = () => {
  const add = async (user: AdminUser) => {
    const response = new AdminUserModel(user).save();
    return response;
  };
  const update = async (email: string, data: AdminUser) => {
    const response = await AdminUserModel.updateOne(
      { email },
      {
        $set: data,
      }
    );
    return response;
  };
  const getByEmail = async (email: string) => {
    return await AdminUserModel.findOne({ email });
  };

  return {
    add,
    update,
    getByEmail,
  };
};

type adminUserRepositoryImpl = ReturnType<typeof adminUserRepositoryImpl>;
export default adminUserRepositoryImpl;
