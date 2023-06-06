import blogRepositoryImpl from "../../frameworks/mongoDb/repository/blogRepositoryImpl";

const blogRepositoryInteraface = (repository: blogRepositoryImpl) => {
  const getBlogById = repository.getBlogById;
  const getBlogByIdPrivate = repository.getBlogByIdPrivate;
  const addNewBlog = repository.addNewBlog;
  const updateBlog = repository.updateBlog;
  const trashBlogById = repository.trashBlogById;
  const updateBodyIndex = repository.updateBodyIndex;
  const updateAsNewBodyIndex = repository.updateAsNewBodyIndex;
  const changeVisiblity = repository.changeVisiblity;
  const getAllBlogsDisplayWithUidWithPrivate = repository.getAllBlogsDisplayWithUidWithPrivate;
  const getAllBlogsDisplayWithUid = repository.getAllBlogsDisplayWithUid;
  const recoverTrashedBlogById = repository.recoverTrashedBlogById;
  const getAllDeletedBlogs = repository.getAllDeletedBlogs;
  const getDeleteBlog = repository.getDeleteBlog;
  const getAllPublicBlogs = repository.getAllPublicBlogs;
  const adminGetAllDisabledBlogs = repository.adminGetAllDisabledBlogs;
  const getBlogByIdAdmin = repository.getBlogByIdAdmin;
  const softDeleteBlogs = repository.softDeleteBlogs;
  const searchBlogs = repository.searchBlogs;
  const searchBlogCategoryTags = repository.searchBlogCategoryTags;

  return {
    getBlogById,
    getBlogByIdPrivate,
    getBlogByIdAdmin,
    addNewBlog,
    updateBlog,
    trashBlogById,
    updateBodyIndex,
    updateAsNewBodyIndex,
    changeVisiblity,
    getAllBlogsDisplayWithUidWithPrivate,
    getAllBlogsDisplayWithUid,
    recoverTrashedBlogById,
    getAllDeletedBlogs,
    getDeleteBlog,
    adminGetAllDisabledBlogs,
    getAllPublicBlogs,
    softDeleteBlogs,
    searchBlogs,
    searchBlogCategoryTags,
  };
};

type blogRepositoryInteraface = ReturnType<typeof blogRepositoryInteraface>;
export default blogRepositoryInteraface;
