import { Blog } from "../../entities/blog";
import blogRepositoryImpl from "../../frameworks/mongoDb/repository/blogRepositoryImpl";

const blogRepositoryInteraface = (
  repository: ReturnType<typeof blogRepositoryImpl>
) => {
  const getBlogById = (blogId: string) => repository.getBlogById(blogId);
  const addNewBlog = (data: Blog) => repository.addNewBlog(data);
  const updateBlog = (blogId: string, data: Blog) =>
    repository.updateBlog(blogId, data);
  const deleteBlogById = (blogId: string) => repository.deleteBlogById(blogId);
  const updateBodyIndex = (blogId: string, index: number, blogData: []) =>
    repository.updateBodyIndex(blogId, index, blogData);
  const updateAsNewBodyIndex = (blogId: string, blogData: []) =>
    repository.updateAsNewBodyIndex(blogId, blogData);

  return {
    getBlogById,
    addNewBlog,
    updateBlog,
    deleteBlogById,
    updateBodyIndex,
    updateAsNewBodyIndex,
  };
};

export default blogRepositoryInteraface;
