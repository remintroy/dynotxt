import { IMakeBlogData } from "../blog/types.blog";
import { blogDb } from "../data-access";

export default function createUpdateBlogData({ createError, blogValidator }) {
  return async function UpdateBlogData(blogData: IMakeBlogData) {
    if (!blogValidator.isBlogWithIdExist(blogData.blogId)) throw createError(400, "Blog with this id not extist");
    return await blogDb.updateBlog(blogData);
  };
}
