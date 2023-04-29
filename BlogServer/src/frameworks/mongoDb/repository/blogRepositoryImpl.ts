import { Blog } from "../../../entities/blog";
import BlogModel from "../models/blog";

const blogRepositoryImpl = () => {
  const getBlogById = async (blogId: string) => {
    const response = await BlogModel.findOne({ blogId });
    return response;
  };

  const addNewBlog = async (blogData: Blog) => {
    const response = await new BlogModel(blogData).save();
    return response;
  };

  const updateBlog = async (blogData: Blog) => {
    const response = await BlogModel.updateOne(
      { blogId: blogData.blogId },
      {
        $set: { body: blogData },
      }
    );
    return response;
  };

  const deleteBlogById = async (blogId: string) => {
    const response = await BlogModel.deleteOne({ blogId });
    return response;
  };

  return {
    getBlogById,
    addNewBlog,
    updateBlog,
    deleteBlogById,
  };
};

export default blogRepositoryImpl;
