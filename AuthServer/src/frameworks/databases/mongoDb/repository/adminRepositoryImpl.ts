import AdminUserModel from "../models/admin";
import { IAdminUser } from "../models/admin.schema";

const adminUserRepositoryImpl = () => {
  const add = async (user: IAdminUser) => {
    const response = new AdminUserModel(user).save();
    return response;
  };
  const update = async (email: string, data: IAdminUser) => {
    const response = await AdminUserModel.updateOne(
      { email },
      {
        $set: data,
      }
    );
    return response;
  };
  const getByEmail = async (email: string) => {
    const response = await AdminUserModel.findOne({ email });
    return response;
  };

  return {
    add,
    update,
    getByEmail,
  };
};

type adminUserRepositoryImpl = ReturnType<typeof adminUserRepositoryImpl>;
export default adminUserRepositoryImpl;
