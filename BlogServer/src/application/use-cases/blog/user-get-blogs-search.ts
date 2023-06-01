import GetUtils from "dynotxt-common-services/build/utils";
import blogRepositoryInteraface from "../../../adaptor/repositorys/blogRepositoryInteraface";

const caseUserBlogsSearch = async (
  blogsRepository: blogRepositoryInteraface,
  utilsService: GetUtils,
  searchQuery: string
) => {
  if (!searchQuery) throw utilsService.createError(400, "Empty search query");
  return await blogsRepository.searchBlogs(searchQuery);
};

export default caseUserBlogsSearch;
