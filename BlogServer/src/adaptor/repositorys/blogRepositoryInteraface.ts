import { Blog } from "../../entities/blog";
import blogRepositoryImpl from "../../frameworks/mongoDb/repository/blogRepositoryImpl";

const blogRepositoryInteraface = (
  repository: ReturnType<typeof blogRepositoryImpl>
) => {
  const getBlogById = (blogId: string) => repository.getBlogById(blogId);
  const addNewBlog = (data: Blog) => repository.addNewBlog(data);
  const updateBlog = (data: Blog) => repository.updateBlog(data);
  const deleteBlogById = (blogId: string) => repository.deleteBlogById(blogId);

  return {
    getBlogById,
    addNewBlog,
    updateBlog,
    deleteBlogById,
  };
};

export default blogRepositoryInteraface;
