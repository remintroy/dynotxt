import { model } from "mongoose";
import { IUser } from "./user.types";
import { userSchema } from "./user.schemas";

export default model<IUser>("users", userSchema);
