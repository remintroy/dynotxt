import blogRepositoryImpl from "../../frameworks/mongoDb/repository/blogRepositoryImpl";

const blogRepositoryInteraface = (repository: blogRepositoryImpl) => {
  const getBlogById = repository.getBlogById;
  const getBlogByIdPrivate = repository.getBlogByIdPrivate;
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
  const adminGetAllDisabledBlogs = repository.adminGetAllDisabledBlogs;
  const getBlogByIdAdmin = repository.getBlogByIdAdmin;

  return {
    getBlogById,
    getBlogByIdPrivate,
    getBlogByIdAdmin,
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
    adminGetAllDisabledBlogs,
    getAllPublicBlogs,
  };
};

type blogRepositoryInteraface = ReturnType<typeof blogRepositoryInteraface>;
export default blogRepositoryInteraface;
