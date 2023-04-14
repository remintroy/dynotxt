import blogModel from "../models/blog.model";

export const getBlogById = async (blogId: string) => {
  return await blogModel.findOne({ blogId });
}; 
