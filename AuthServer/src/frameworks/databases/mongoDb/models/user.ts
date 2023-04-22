import { model } from "mongoose";
import { IUser, userSchema } from "./user.schema";

const UserModel = model<IUser>("users", userSchema);

export default UserModel;
