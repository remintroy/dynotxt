import { model } from "mongoose";
import adminUserSchema, { AdminUser } from "./admin.schema";

const AdminUserModel = model<AdminUser>("adminUser", adminUserSchema);

export default AdminUserModel;
