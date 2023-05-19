import GetUtils from "dynotxt-common-services/build/utils";
import blogRepositoryInteraface from "../../../adaptor/repositorys/blogRepositoryInteraface";

const caseAdminGetAllDisabledBlogs = async (blogsRepository: blogRepositoryInteraface, utilsService: GetUtils) => {
  return await blogsRepository.adminGetAllDisabledBlogs().catch(utilsService.throwInternalError());
};

type caseAdminGetAllDisabledBlogs = typeof caseAdminGetAllDisabledBlogs;
export default caseAdminGetAllDisabledBlogs;
