import { model } from "mongoose";
import { Blog } from "../../../../entites/blog";
import BlogSchema from "./blog.schema";

export const BlogModel = model<Blog>("blogs", BlogSchema);
export default BlogModel;
