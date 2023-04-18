import { IMakeBlogData } from "../blog/types.blog";
import blogModel from "../models/blog.model";

export const createBlogDb = ({ createError, blogValidator }) => {
  const getBlogById = async (blogId: string) => {
    return await blogModel.findOne({ blogId });
  };

  const addNewBlog = async (blogData: IMakeBlogData) => {
    return await new blogModel(blogData).save();
  };

  const updateBlog = async (blogData: IMakeBlogData) => {
    return await blogModel.updateOne(
      { blogId: blogData.blogId },
      {
        $set: { body: blogData },
      }
    );
  };

  const deleteBlog = async (blogId: string) => {
    return await blogModel.deleteOne({ blogId: blogId });
  };

  return {
    getBlogById,
    addNewBlog,
    updateBlog,
    deleteBlog,
  };
};
