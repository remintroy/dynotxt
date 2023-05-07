import paginate from "mongoose-paginate-v2";
import { PaginateModel, model } from "mongoose";
import LikesSchema from "./likes.schema";
import Likes from "../../../entities/likes";

LikesSchema.plugin(paginate);

export const LikesModel = model<Likes, PaginateModel<Likes>>(
  "likes",
  LikesSchema
);
export default LikesModel;
