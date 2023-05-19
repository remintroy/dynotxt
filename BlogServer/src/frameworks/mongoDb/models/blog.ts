import paginate from "mongoose-paginate-v2";
import aggregatePaginate from "mongoose-aggregate-paginate-v2";
import { AggregatePaginateModel, PaginateModel, model } from "mongoose";
import { Blog } from "../../../entities/blog";
import BlogSchema from "./blog.schema";

BlogSchema.plugin(paginate);
BlogSchema.plugin(aggregatePaginate);

export const BlogModel = model<Blog, PaginateModel<Blog> & AggregatePaginateModel<Blog>>("blogs", BlogSchema);
export default BlogModel;
