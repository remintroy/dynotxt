import GetUtils from "dynotxt-common-services/build/utils";
import flagsRepositoryInterface from "../../../adaptor/repositorys/flagsRepositoryInterface";

const caseAdminGetFlaggedBlogs = async (flagsRepository: flagsRepositoryInterface, utilsService: GetUtils) => {
  return await flagsRepository
    .getAllFlaggedBLogs()
    .catch(utilsService.throwInternalError("Faild to get flagged blogs"));
};

type caseAdminGetFlaggedBlogs = typeof caseAdminGetFlaggedBlogs;
export default caseAdminGetFlaggedBlogs;
