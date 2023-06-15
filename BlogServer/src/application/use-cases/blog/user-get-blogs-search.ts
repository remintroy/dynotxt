import GetUtils from "dynotxt-common-services/build/utils";
import blogRepositoryInteraface from "../../../adaptor/repositorys/blogRepositoryInteraface";

const caseUserBlogsSearch = async (
  blogsRepository: blogRepositoryInteraface,
  utilsService: GetUtils,
  searchQuery: string,
  pageNumber: number
) => {
  // if (!searchQuery) throw utilsService.createError(400, "Empty search query");
  return await blogsRepository.searchBlogs(searchQuery, pageNumber).catch(utilsService.throwInternalError());
};

export default caseUserBlogsSearch;
