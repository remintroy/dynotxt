import { model } from "mongoose";
import { IUser, userSchema } from "./user.schema";

const userModel = model<IUser>("users", userSchema);

export default userModel;
