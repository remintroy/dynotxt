import GetUtils from "dynotxt-common-services/build/utils";
import blogRepositoryInteraface from "../../../adaptor/repositorys/blogRepositoryInteraface";
import flagsRepositoryInterface from "../../../adaptor/repositorys/flagsRepositoryInterface";

const caseAdminEnableBlogDueToFlag = async (
  flagsRepository: flagsRepositoryInterface,
  blogsRepository: blogRepositoryInteraface,
  utilsService: GetUtils,
  blogId: string
) => {
  if (!blogId) throw utilsService.createError(400, "BlogId is required");

  const existingBlogData = await blogsRepository.getBlogByIdAdmin(blogId).catch(utilsService.throwInternalError());

  if (!existingBlogData) throw utilsService.createError(400, "Cant enable blog because no blog exist");

  existingBlogData.disabled = false;

  await flagsRepository.updateStatusFlagsForSingleBlogAsEnabled(blogId).catch(utilsService.throwInternalError());

  return await existingBlogData.save().catch(utilsService.throwInternalError());
};

type caseAdminEnableBlogDueToFlag = typeof caseAdminEnableBlogDueToFlag;
export default caseAdminEnableBlogDueToFlag;
