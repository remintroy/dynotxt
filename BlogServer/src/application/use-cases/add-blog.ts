import blogRepositoryInteraface from "../../adaptor/repositorys/blogRepositoryInteraface";
import blogServiceInterface from "../../adaptor/service";
import { Blog } from "../../entities/blog";
import { blogValidator } from "../validators/blog";
import createBlogId from "./create-blog-id";

const addNewBlog = async (
  blogRepository: ReturnType<typeof blogRepositoryInteraface>,
  blogService: ReturnType<typeof blogServiceInterface>,
  createError,
  blogData: Blog,
  author: string
) => {
  // To create new blog, author and blogId is requried
  // authorId must me collected from access token or logined user !
  const blogId = await createBlogId(blogRepository, blogService);

  const dataToCheck = { ...blogData, blogId, author };
  const validBlogData = new Blog(blogValidator(dataToCheck, createError));

  // if(Object.keys(validBlogData).length)delta

  try {
    await blogRepository.addNewBlog(validBlogData);
    return {
      blogId,
      status: "Created",
    };
  } catch (error) {
    throw createError(500, "Faild to save blog");
  }
};

export default addNewBlog;
