import GetUtils from "dynotxt-common-services/build/utils";
import blogRepositoryInteraface from "../../../adaptor/repositorys/blogRepositoryInteraface";

const caseUserBlogGetFromCategoryList = async (
  blogRepository: blogRepositoryInteraface,
  utilsService: GetUtils,
  categoryList: string[],
  options: { page?: number }
) => {
  return await blogRepository.getBlogsWithCategoryList(categoryList, options).catch(utilsService.throwInternalError());
};

export default caseUserBlogGetFromCategoryList;
