import GetUtils from "dynotxt-common-services/build/utils";
import blogRepositoryInteraface from "../../../adaptor/repositorys/blogRepositoryInteraface";

const caseUserSearchBlogCategoryList = async (
  blogRepository: blogRepositoryInteraface,
  utilsService: GetUtils,
  searchQuery: string,
  page: number
) => {
  return await blogRepository.searchBlogCategoryTags(searchQuery, page).catch(utilsService.throwInternalError());
};

export default caseUserSearchBlogCategoryList;
