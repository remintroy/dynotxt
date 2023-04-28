import { model } from "mongoose";
import adminUserSchema, { IAdminUser } from "./admin.schema";

const AdminUserModel = model<IAdminUser>("adminUser", adminUserSchema);

export default AdminUserModel;
