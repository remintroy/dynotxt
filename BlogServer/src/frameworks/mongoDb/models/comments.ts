import paginate from "mongoose-paginate-v2";
import { PaginateModel, model } from "mongoose";
import CommentSchema from "./comments.schema";
import Comment from "../../../entities/comments";

CommentSchema.plugin(paginate);

export const CommentModel = model<Comment, PaginateModel<Comment>>(
  "comments",
  CommentSchema
);
export default CommentModel;
