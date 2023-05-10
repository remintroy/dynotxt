import { Blog } from "../../entities/blog";
import blogRepositoryImpl from "../../frameworks/mongoDb/repository/blogRepositoryImpl";

const blogRepositoryInteraface = (repository: blogRepositoryImpl) => {
  const getBlogById = (blogId: string) => repository.getBlogById(blogId);
  const addNewBlog = (data: Blog) => repository.addNewBlog(data);
  const updateBlog = (blogId: string, data: Blog) =>
    repository.updateBlog(blogId, data);
  const deleteBlogById = (blogId: string) => repository.deleteBlogById(blogId);
  const updateBodyIndex = (blogId: string, index: number, blogData: []) =>
    repository.updateBodyIndex(blogId, index, blogData);
  const updateAsNewBodyIndex = (blogId: string, blogData: []) =>
    repository.updateAsNewBodyIndex(blogId, blogData);
  const changeVisiblity = (blogId: string, visiblity: "public" | "private") =>
    repository.changeVisiblity(blogId, visiblity);
  const getAllBlogsDisplayWithUidWithPrivate = (userId: string) =>
    repository.getAllBlogsDisplayWithUidWithPrivate(userId);
  const getAllBlogsDisplayWithUid = (userId: string) =>
    repository.getAllBlogsDisplayWithUid(userId);
  const recoverDeletedBlogById = (userId: string) =>
    repository.recoverDeletedBlogById(userId);
  const getAllDeletedBlogs = (userId: string) =>
    repository.getAllDeletedBlogs(userId);

  return {
    getBlogById,
    addNewBlog,
    updateBlog,
    deleteBlogById,
    updateBodyIndex,
    updateAsNewBodyIndex,
    changeVisiblity,
    getAllBlogsDisplayWithUidWithPrivate,
    getAllBlogsDisplayWithUid,
    recoverDeletedBlogById,
    getAllDeletedBlogs,
  };
};

type blogRepositoryInteraface = ReturnType<typeof blogRepositoryInteraface>;
export default blogRepositoryInteraface;
