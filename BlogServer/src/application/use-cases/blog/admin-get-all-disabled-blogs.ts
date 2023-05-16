import blogRepositoryInteraface from "../../../adaptor/repositorys/blogRepositoryInteraface";

const caseAdminGetAllDisabledBlogs = async (blogsRepository: blogRepositoryInteraface, createError: any) => {
  return await blogsRepository.adminGetAllDisabledBlogs().catch((error) => {
    throw createError(500, "Something went wrong", error);
  });
};

type caseAdminGetAllDisabledBlogs = typeof caseAdminGetAllDisabledBlogs;
export default caseAdminGetAllDisabledBlogs;
