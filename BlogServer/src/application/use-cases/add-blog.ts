import blogRepositoryInteraface from "../../adaptor/repositorys/blogRepositoryInteraface";
import { Blog } from "../../entities/blog";
import { blogValidator } from "../validators/blog";

const addNewBlog = async (
  blogRepository: ReturnType<typeof blogRepositoryInteraface>,
  createError,
  blogData: Blog,
  author: string
) => {
  // To create new blog, author and blogId is requried
  // authorId must me collected from access token or logined user !
  const blogId = "";

  const dataToCheck = { ...blogData, blogId, author };
  const validBlogData = blogValidator(dataToCheck, createError);

  try {
    const responseFromDb = await blogRepository.addNewBlog(validBlogData);
    return {
      blogId,
      status: responseFromDb,
    };
  } catch (error) {
    throw createError(500, "Faild to save blog");
  }
};

export default addNewBlog;
