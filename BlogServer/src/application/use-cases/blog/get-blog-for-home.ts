import blogRepositoryInteraface from "../../../adaptor/repositorys/blogRepositoryInteraface";

const caseGetBlogForHome = async (blogRepository: blogRepositoryInteraface, createError: any) => {
  try {
    return await blogRepository.getAllPublicBlogs();
  } catch (error) {
    throw createError(500, "Faild to get blogs");
  }
};

type caseGetBlogForHome = typeof caseGetBlogForHome;
export default caseGetBlogForHome;
