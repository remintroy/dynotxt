import flagsRepositoryInterface from "../../../adaptor/repositorys/flagsRepositoryInterface";

const caseAdminGetFlaggeBlogs = async (flagsRepository: flagsRepositoryInterface, createError: any) => {
  return await flagsRepository.getAllFlaggedBLogs().catch(() => {
    throw createError(500, "Faild to get flagged blogs");
  });
};

type caseAdminGetFlaggeBlogs = typeof caseAdminGetFlaggeBlogs;
export default caseAdminGetFlaggeBlogs;
