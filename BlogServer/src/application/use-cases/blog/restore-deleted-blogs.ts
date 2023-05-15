import blogRepositoryInteraface from "../../../adaptor/repositorys/blogRepositoryInteraface";

const caseRecoverTrashedBlogs = async (
  blogRepository: blogRepositoryInteraface,
  createError: any,
  currentUserId: string,
  blogId: string
) => {
  if (!blogId) throw createError(400, "BlogId Is required to restore blog");

  const existingData = await blogRepository
    .getDeleteBlog(currentUserId, blogId)
    .catch(() => {
      throw createError(400, "Error while fetching blog");
    });

  if (!existingData) throw createError(404, "Blog not found");

  await blogRepository.recoverDeletedBlogById(blogId).catch(() => {
    throw createError(400, "Error while recovering blog");
  });
};

type caseRecoverTrashedBlogs = typeof caseRecoverTrashedBlogs;
export default caseRecoverTrashedBlogs;
