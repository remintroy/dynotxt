import flagsRepositoryInterface from "../../../adaptor/repositorys/flagsRepositoryInterface";

const caseAdminDeleteAllFlagsForSingBlog = async (
  flagsReposirtory: flagsRepositoryInterface,
  createError: any,
  blogId: string
) => {
  if (!blogId) throw createError(400, "BlogId is required to delete flags");
  return await flagsReposirtory.removeAllFlagForSingBlog(blogId).catch(() => {
    throw createError(500, "Something went wrong while deleteing flags");
  });
};

type caseAdminDeleteAllFlagsForSingBlog = typeof caseAdminDeleteAllFlagsForSingBlog;
export default caseAdminDeleteAllFlagsForSingBlog;
