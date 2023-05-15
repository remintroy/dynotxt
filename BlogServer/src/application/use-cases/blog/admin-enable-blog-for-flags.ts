import blogRepositoryInteraface from "../../../adaptor/repositorys/blogRepositoryInteraface";
import flagsRepositoryInterface from "../../../adaptor/repositorys/flagsRepositoryInterface";

const caseAdminEnableBlog = async (
  flagsRepository: flagsRepositoryInterface,
  blogsRepository: blogRepositoryInteraface,
  createError: any,
  throwCatchInternalError: any,
  blogId: string
) => {
  if (!blogId) throw createError(400, "BlogId is required");

  const existingBlogData = await blogsRepository.getBlogByIdAdmin(blogId).catch(throwCatchInternalError());

  if (!existingBlogData) throw createError(400, "Cant enable blog because no blog exist");

  existingBlogData.disabled = false;

  await flagsRepository.updateStatusFlagsForSingleBlogAsEnabled(blogId).catch(throwCatchInternalError());

  return await existingBlogData.save().catch(throwCatchInternalError());
};

type caseAdminEnableBlog = typeof caseAdminEnableBlog;
export default caseAdminEnableBlog;
