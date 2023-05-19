import GetUtils from "dynotxt-common-services/build/utils";
import blogRepositoryInteraface from "../../../adaptor/repositorys/blogRepositoryInteraface";
import flagsRepositoryInterface from "../../../adaptor/repositorys/flagsRepositoryInterface";

const caseAdminDisableBlogDueToFlag = async (
  flagsRepository: flagsRepositoryInterface,
  blogsRepository: blogRepositoryInteraface,
  utilsService: GetUtils,
  blogId: string
) => {
  if (!blogId) throw utilsService.createError(400, "BlogId is required");

  const flagFromDb = await flagsRepository.getFlagsForSingleBlog(blogId).catch(utilsService.throwInternalError());
  const existingBlogData = await blogsRepository.getBlogByIdAdmin(blogId).catch(utilsService.throwInternalError());

  if (flagFromDb.length == 0)
    throw utilsService.createError(400, "Cant disable blog because no curreponding flags were found");
  if (!existingBlogData) throw utilsService.createError(400, "Cant disable blog because no blog exist");

  existingBlogData.disabled = true;

  await flagsRepository.updateStatusFlagsForSingleBlogAsDisabled(blogId).catch(utilsService.throwInternalError());

  return await existingBlogData.save().catch(utilsService.throwInternalError());
};

type caseAdminDisableBlogDueToFlag = typeof caseAdminDisableBlogDueToFlag;
export default caseAdminDisableBlogDueToFlag;
