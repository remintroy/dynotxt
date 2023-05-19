import GetUtils from "dynotxt-common-services/build/utils";
import flagsRepositoryInterface from "../../../adaptor/repositorys/flagsRepositoryInterface";

const caseAdminRemoveBlogFlagsByBlogId = async (
  flagsReposirtory: flagsRepositoryInterface,
  utilsService: GetUtils,
  blogId: string
) => {
  if (!blogId) throw utilsService.createError(400, "BlogId is required to delete flags");
  return await flagsReposirtory
    .removeAllFlagForSingBlog(blogId)
    .catch(utilsService.throwInternalError("Something went wrong while deleteing flags"));
};

type caseAdminRemoveBlogFlagsByBlogId = typeof caseAdminRemoveBlogFlagsByBlogId;
export default caseAdminRemoveBlogFlagsByBlogId;
