import blogRepositoryInteraface from "../../adaptor/repositorys/blogRepositoryInteraface";
import blogServiceInterface from "../../adaptor/service";
import { Blog } from "../../entities/blog";

const createBlogId = async (
  blogRepository: ReturnType<typeof blogRepositoryInteraface>,
  blogService: ReturnType<typeof blogServiceInterface>
) => {
  let blogId: string;
  let exisitingBlog: Blog;

  do {
    // eslint-disable-next-line no-await-in-loop
    blogId = await blogService.createId();
    // eslint-disable-next-line no-await-in-loop
    exisitingBlog = await blogRepository.getBlogById(blogId);
  } while (exisitingBlog);

  return blogId;
};

export default createBlogId;
