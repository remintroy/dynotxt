import GetUtils from "dynotxt-common-services/build/utils";
import viewsRepositoryInterface from "../../../adaptor/repositorys/viewsRepositoryInterface";

const caseUserViewsGetByBlogId = async (
  viewsRepository: viewsRepositoryInterface,
  utilService: GetUtils,
  blogId: string
) => {
  if (!blogId) throw utilService.createError(400, "BlogId is required");
  return await viewsRepository.getViewsByBlogId(blogId).catch(utilService.throwInternalError());
};

export default caseUserViewsGetByBlogId;
