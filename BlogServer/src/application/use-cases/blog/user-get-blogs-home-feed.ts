import GetUtils from "dynotxt-common-services/build/utils";
import blogRepositoryInteraface from "../../../adaptor/repositorys/blogRepositoryInteraface";

const caseUserBlogsGetForHomeFeed = async (blogRepository: blogRepositoryInteraface, utilsService: GetUtils) => {
  return await blogRepository.getAllPublicBlogs().catch(utilsService.throwInternalError("Faild to get blogs"));
};

export default caseUserBlogsGetForHomeFeed;
