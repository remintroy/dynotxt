import { getBlogId } from "../id";
import { utils } from "../services";
import { blogValidator } from "../validator";
import createCreateBlog from "./blog-create";
import createDeleteBlog from "./blog-delete";
import createGetBlogDataById from "./blog-get-by-id";
import createUpdateBlogData from "./blog-update";

const blogId = getBlogId();

export const createBlog = createCreateBlog({ blogId });
export const getBlogById = createGetBlogDataById();
export const updateBlog = createUpdateBlogData({ createError: utils.createError, blogValidator });
export const deleteBlog = createDeleteBlog();

export default {
  createBlog,
  getBlogById,
  updateBlog,
  deleteBlog,
};
