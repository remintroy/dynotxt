import { model, PaginateModel } from "mongoose";
import { IUser, userSchema } from "./user.schema";
import paginate from "mongoose-paginate-v2";

userSchema.plugin(paginate);

const UserModel = model<IUser, PaginateModel<IUser>>("users", userSchema);

export default UserModel;
