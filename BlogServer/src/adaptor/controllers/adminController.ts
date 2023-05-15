import caseAdminDeleteAllFlagsForSingBlog from "../../application/use-cases/blog/admin-delete-all-flags-for-single-blog";
import caseAdminGetFlaggeBlogs from "../../application/use-cases/blog/admin-get-flagged-blogs";
import { RequestWithUser } from "../../frameworks/webserver/express";
import blogRepositoryInteraface from "../repositorys/blogRepositoryInteraface";
import flagsRepositoryInterface from "../repositorys/flagsRepositoryInterface";
import blogServiceInterface from "../service";

const adminController = (
  blogRepository: blogRepositoryInteraface,
  blogService: blogServiceInterface,
  flagsRepository: flagsRepositoryInterface,
  createError: any
) => {
  const getAllFlaggedBlogs = async () => {
    return await caseAdminGetFlaggeBlogs(flagsRepository, createError);
  };

  const deleteAllFlagsForSigleBlog = async (req: RequestWithUser) => {
    const blogId = req.params.id;
    return await caseAdminDeleteAllFlagsForSingBlog(flagsRepository, createError, blogId);
  };

  return {
    getAllFlaggedBlogs,
    deleteAllFlagsForSigleBlog,
  };
};

export default adminController;
