import GetUtils from "dynotxt-common-services/build/utils";
import blogRepositoryInteraface from "../../../adaptor/repositorys/blogRepositoryInteraface";

const caseUserSearchBlogCategoryList = async (
  blogRepository: blogRepositoryInteraface,
  utilsService: GetUtils,
  searchQuery: string
) => {
  return await blogRepository.searchBlogCategoryTags(searchQuery).catch(utilsService.throwInternalError());
};

export default caseUserSearchBlogCategoryList;
