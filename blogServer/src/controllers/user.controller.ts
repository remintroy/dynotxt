import { blogDb } from "../data-access/";
import { utils } from "../services";
import { IRequest } from "./types";

export const getFetchBlogById = async (request: IRequest) => {
  const blogId = request.params.id;
  try {
    return await blogDb.getBlogById(blogId);
  } catch (error) {
    throw utils.createError(400, error);
  }
};
