import blogRepositoryInteraface from "../../adaptor/repositorys/blogRepositoryInteraface";
import { Blog } from "../../entities/blog";
import { blogValidator } from "../validators/blog";

const updateBlog = async (
  blogRepository: ReturnType<typeof blogRepositoryInteraface>,
  createError,
  blogId,
  author,
  blogData
) => {
  const dataToCheck = { ...blogData, blogId, author };
  const validBlogData = blogValidator(dataToCheck, createError, true);

  const existingBlogData = await blogRepository.getBlogById(blogId);

  if (!existingBlogData) {
    throw createError(400, "Cannot update non-existing blog");
  }

  const dataToSave: Blog = {};

  return blogRepository.updateBlog(blogId, validBlogData);
};

export default updateBlog;
