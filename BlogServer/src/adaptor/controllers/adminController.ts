import caseAdminDeleteAllFlagsForSingBlog from "../../application/use-cases/blog/admin-remove-flags-by-blogId";
import caseAdminDisableBlog from "../../application/use-cases/blog/admin-disable-blog-dueto-flag";
import caseAdminEnableBlog from "../../application/use-cases/blog/admin-enable-blog-dueto-flags";
import caseAdminGetAllDisabledBlogs from "../../application/use-cases/blog/admin-get-all-disabled-blogs";
import caseAdminGetFlaggeBlogs from "../../application/use-cases/blog/admin-get-flagged-blogs";
import blogRepositoryInteraface from "../repositorys/blogRepositoryInteraface";
import flagsRepositoryInterface from "../repositorys/flagsRepositoryInterface";
import GetUtils from "dynotxt-common-services/build/utils";
import { RequestWithUser } from "../../frameworks/webserver/express";

const adminController = (
  blogRepository: blogRepositoryInteraface,
  flagsRepository: flagsRepositoryInterface,
  utilsService: GetUtils
) => {
  const getAllFlaggedBlogs = async () => {
    return await caseAdminGetFlaggeBlogs(flagsRepository, utilsService);
  };

  const deleteAllFlagsForSigleBlog = async (req: RequestWithUser) => {
    const blogId = req.params.id;
    return await caseAdminDeleteAllFlagsForSingBlog(flagsRepository, utilsService, blogId);
  };

  const putDisableFlaggedBlog = async (req: RequestWithUser) => {
    const blogId = req.params.id;
    return await caseAdminDisableBlog(flagsRepository, blogRepository, utilsService, blogId);
  };

  const putEnableFlaggedBlog = async (req: RequestWithUser) => {
    const blogId = req.params.id;
    return await caseAdminEnableBlog(flagsRepository, blogRepository, utilsService, blogId);
  };

  const getAllDisabledBlogs = async () => {
    return await caseAdminGetAllDisabledBlogs(blogRepository, utilsService);
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
