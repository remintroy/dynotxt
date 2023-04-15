import { IMakeBlogData } from "../blog/types.blog";

export const createBlogDb = ({ createError, blogValidator, blogModel }) => {
  const getBlogById = async (blogId: string) => {
    return await blogModel.findOne({ blogId });
  };

  const addNewBlog = async (blogData: IMakeBlogData) => {
    if (blogValidator.isBlogWithIdExist(blogData.blogId)) throw createError(400, "Blog already exists");
    return await new blogModel(blogData).save();
  };

  return {
    getBlogById,
    addNewBlog,
  };
};
