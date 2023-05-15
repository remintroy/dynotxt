import blogRepositoryInteraface from "../../../adaptor/repositorys/blogRepositoryInteraface";
import flagsRepositoryInterface from "../../../adaptor/repositorys/flagsRepositoryInterface";

const caseAdminDisableBlog = async (
  flagsRepository: flagsRepositoryInterface,
  blogsRepository: blogRepositoryInteraface,
  createError: any,
  throwCatchInternalError: any,
  blogId: string
) => {
  if (!blogId) throw createError(400, "BlogId is required");

  const flagFromDb = await flagsRepository.getFlagsForSingleBlog(blogId).catch(throwCatchInternalError());
  const existingBlogData = await blogsRepository.getBlogByIdAdmin(blogId).catch(throwCatchInternalError());

  if (flagFromDb.length == 0) throw createError(400, "Cant disable blog because no curreponding flags were found");
  if (!existingBlogData) throw createError(400, "Cant disable blog because no blog exist");

  existingBlogData.disabled = true;

  await flagsRepository.updateStatusFlagsForSingleBlogAsDisabled(blogId).catch(throwCatchInternalError());

  return await existingBlogData.save().catch(throwCatchInternalError());
};

type caseAdminDisableBlog = typeof caseAdminDisableBlog;
export default caseAdminDisableBlog;
