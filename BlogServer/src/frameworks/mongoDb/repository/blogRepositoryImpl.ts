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

  const updateBlog = async (blogId: string, blogData: Blog) => {
    const response = await BlogModel.updateOne(
      { blogId },
      {
        $set: blogData,
      }
    );
    return response;
  };

  const deleteBlogById = async (blogId: string) => {
    const response = await BlogModel.deleteOne({ blogId });
    return response;
  };

  const updateBodyIndex = async (
    blogId: string,
    index: number,
    bodyData: []
  ) => {
    const response = await BlogModel.updateOne(
      { blogId },
      {
        $set: {
          [`body.${index}`]: bodyData,
        },
      }
    );
    return response;
  };

  const updateAsNewBodyIndex = async (blogId: string, bodyData: []) => {
    const response = await BlogModel.updateOne(
      { blogId },
      {
        $push: {
          body: bodyData,
        },
      }
    );
    return response;
  };

  return {
    getBlogById,
    addNewBlog,
    updateBlog,
    deleteBlogById,
    updateBodyIndex,
    updateAsNewBodyIndex,
  };
};

export default blogRepositoryImpl;
