import { utils } from "../services";
import { createBlog, deleteBlog, getBlogById, updateBlog } from "../use-cases";
import { IRequest } from "./types";

export const getFetchBlogById = async (request: IRequest) => {
  const blogId = request.params.id;
  try {
    return await getBlogById(blogId);
  } catch (error) {
    throw utils.createError(400, error);
  }
};

export const postCreateNewBlog = async (request: IRequest) => {
  const data = request.body;
  try { 
    return await createBlog(data);
  } catch (error) {
    throw utils.createError(error.code ? error.code : 400, error?.message);
  }
};

export const putUpdateBlogData = async (request: IRequest) => {
  const data = request.body;
  try {
    return await updateBlog(data);
  } catch (error) {
    throw utils.createError(error.code ? error.code : 400, error);
  }
};

export const deleteBlogData = async (request: IRequest) => {
  const blogId = request.params.id;
  try {
    return await deleteBlog(blogId);
  } catch (error) {
    throw utils.createError(error.code ? error.code : 400, error);
  }
};
