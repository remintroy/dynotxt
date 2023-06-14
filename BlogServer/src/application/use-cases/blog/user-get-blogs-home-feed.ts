import GetUtils from "dynotxt-common-services/build/utils";
import blogRepositoryInteraface from "../../../adaptor/repositorys/blogRepositoryInteraface";

const caseUserBlogsGetForHomeFeed = async (
  blogRepository: blogRepositoryInteraface,
  utilsService: GetUtils,
  querys: any,
  page: number
) => {
  return await blogRepository
    .getAllPublicBlogs(querys, page)
    .catch(utilsService.throwInternalError("Faild to get blogs"));
};

export default caseUserBlogsGetForHomeFeed;
