import blogRepositoryInteraface from "../../adaptor/repositorys/blogRepositoryInteraface";

const publishBlog = async (
  blogrepository: ReturnType<typeof blogRepositoryInteraface>,
  createError,
  blogId,
  user
) => {
  if (!blogId) throw createError(400, "Blog id is required to publish blog");
  if (!user) throw createError(400, "Userid is required to publish blog");

  const existingData = await blogrepository.getBlogById(blogId);

  if (!existingData)
    throw createError(400, "Blogid is required to publish blog");

  if (existingData.author !== user)
    throw createError(400, "You dont have permission to publish blog");

  try {
    return await blogrepository.changeVisiblity(blogId, "public");
  } catch (error) {
    throw createError(500, "Faild to publish blog");
  }
};

export default publishBlog;
