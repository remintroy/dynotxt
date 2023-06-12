import GetUtils from "dynotxt-common-services/build/utils";
import viewsRepositoryInterface from "../../../adaptor/repositorys/viewsRepositoryInterface";

const caseUserVIewsGetByBlogId = async (
  viewsRepository: viewsRepositoryInterface,
  utilService: GetUtils,
  currentUserId: string,
  blogId: string,
  lastNDays: number
) => {
  if (!currentUserId) throw utilService.createError(401, "You dont have permission to access this data");
  return await viewsRepository.getAllViewsInLastNDaysWithBlogId(currentUserId, blogId, lastNDays);
};

export default caseUserVIewsGetByBlogId;
