import blogRepositoryImpl from "../../frameworks/mongoDb/repository/blogRepositoryImpl";

const blogRepositoryInteraface = (repository: blogRepositoryImpl) => {
  const getBlogById = repository.getBlogById;
  const addNewBlog = repository.addNewBlog;
  const updateBlog = repository.updateBlog;
  const deleteBlogById = repository.deleteBlogById;
  const updateBodyIndex = repository.updateBodyIndex;
  const updateAsNewBodyIndex = repository.updateAsNewBodyIndex;
  const changeVisiblity = repository.changeVisiblity;
  const getAllBlogsDisplayWithUidWithPrivate = repository.getAllBlogsDisplayWithUidWithPrivate;
  const getAllBlogsDisplayWithUid = repository.getAllBlogsDisplayWithUid;
  const recoverDeletedBlogById = repository.recoverDeletedBlogById;
  const getAllDeletedBlogs = repository.getAllDeletedBlogs;
  const getDeleteBlog = repository.getDeleteBlog;
  const getAllPublicBlogs = repository.getAllPublicBlogs;

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
    getDeleteBlog,
    getAllPublicBlogs,
  };
};

type blogRepositoryInteraface = ReturnType<typeof blogRepositoryInteraface>;
export default blogRepositoryInteraface;
