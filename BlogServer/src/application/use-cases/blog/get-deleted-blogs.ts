import blogRepositoryInteraface from "../../../adaptor/repositorys/blogRepositoryInteraface";

const caseGetDeleteBlogs = async (
  blogRepository: blogRepositoryInteraface,
  createError: any,
  userId: string
) => {
  if (!userId)
    throw createError(401, "You must be logged in to get trashed blogs");

  const blogsOnTrash = await blogRepository
    .getAllDeletedBlogs(userId)
    .catch((error) => {
      throw createError(500, "Faild to get deleted blogs");
    });

  return blogsOnTrash;
};

type caseGetDeleteBlogs = typeof caseGetDeleteBlogs;
export default caseGetDeleteBlogs;
