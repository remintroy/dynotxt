import blogRepositoryInteraface from "../../../adaptor/repositorys/blogRepositoryInteraface";
import { Blog } from "../../../entities/blog";

const caseDeleteBlog = async (
  blogRepository: blogRepositoryInteraface,
  createError: any,
  currentUserId: string,
  blogId: string
) => {
  if (!currentUserId)
    throw createError(400, "Authenticated user id is required");
  if (!blogId) throw createError(400, "Blog id is required to delete blog");

  let existingBlogData: Blog;
  try {
    existingBlogData = await blogRepository.getBlogById(blogId);
  } catch (error) {
    throw createError(400, "Faild to fetch nessory data");
  }

  if (!existingBlogData) throw createError(400, "Blog not found");

  if (existingBlogData.author !== currentUserId)
    throw createError(403, "You dont have permission to delete this blog");

  if (existingBlogData.deleted) throw createError(400, "Blog already deleted");

  try {
    return await blogRepository.deleteBlogById(blogId);
  } catch (error) {
    throw createError(400, "Faild to delete blog");
  }
};

type caseDeleteBlog = typeof caseDeleteBlog;
export default caseDeleteBlog;
