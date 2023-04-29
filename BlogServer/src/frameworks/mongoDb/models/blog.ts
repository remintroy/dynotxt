import paginate from "mongoose-paginate-v2";
import { PaginateModel, model } from "mongoose";
import { Blog } from "../../../entities/blog";
import BlogSchema from "./blog.schema";

BlogSchema.plugin(paginate);

export const BlogModel = model<Blog, PaginateModel<Blog>>("blogs", BlogSchema);
export default BlogModel;
