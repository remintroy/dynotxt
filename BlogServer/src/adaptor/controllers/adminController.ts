import caseAdminDeleteAllFlagsForSingBlog from "../../application/use-cases/blog/admin-delete-all-flags-for-single-blog";
import caseAdminDisableBlog from "../../application/use-cases/blog/admin-disable-blog-for-flag";
import caseAdminEnableBlog from "../../application/use-cases/blog/admin-enable-blog-for-flags";
import caseAdminGetAllDisabledBlogs from "../../application/use-cases/blog/admin-get-all-disabled-blogs";
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
  const throwCatchInternalError = (message?: string) => {
    return (error: any) => {
      throw createError(500, message ?? "Something went wrong", error);
    };
  };

  const getAllFlaggedBlogs = async () => {
    return await caseAdminGetFlaggeBlogs(flagsRepository, createError);
  };

  const deleteAllFlagsForSigleBlog = async (req: RequestWithUser) => {
    const blogId = req.params.id;
    return await caseAdminDeleteAllFlagsForSingBlog(flagsRepository, createError, blogId);
  };

  const putDisableFlaggedBlog = async (req: RequestWithUser) => {
    const blogId = req.params.id;
    return await caseAdminDisableBlog(flagsRepository, blogRepository, createError, throwCatchInternalError, blogId);
  };

  const putEnableFlaggedBlog = async (req: RequestWithUser) => {
    const blogId = req.params.id;
    return await caseAdminEnableBlog(flagsRepository, blogRepository, createError, throwCatchInternalError, blogId);
  };

  const getAllDisabledBlogs = async () => {
    return await caseAdminGetAllDisabledBlogs(blogRepository, createError);
  };

  return {
    getAllFlaggedBlogs,
    deleteAllFlagsForSigleBlog,
    putDisableFlaggedBlog,
    getAllDisabledBlogs,
    putEnableFlaggedBlog,
  };
};

export default adminController;
