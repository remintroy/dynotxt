import GetUtils from "dynotxt-common-services/build/utils";
import blogRepositoryInteraface from "../../../adaptor/repositorys/blogRepositoryInteraface";
import blogServiceInterface from "../../../adaptor/service";
import { Blog } from "../../../entities/blog";
import { blogValidator } from "../../validators/blog";
import createBlogId from "./create-blog-id";

const caseUserBlogAddNew = async (
  blogRepository: blogRepositoryInteraface,
  blogService: blogServiceInterface,
  utilsService: GetUtils,
  blogData: Blog,
  author: string
) => {
  // To create new blog, author and blogId is requried
  // authorId must me collected from access token or logined user !
  const blogId = await createBlogId(blogRepository, blogService);

  const dataToCheck = { ...blogData, blogId, author };
  const validBlogData = new Blog(blogValidator(dataToCheck, utilsService.createError));

  // if(Object.keys(validBlogData).length)delta
  await blogRepository.addNewBlog(validBlogData).catch(utilsService.throwInternalError("Faild to save blog"));

  return {
    blogId,
    status: "Created",
  };
};

export default caseUserBlogAddNew;
