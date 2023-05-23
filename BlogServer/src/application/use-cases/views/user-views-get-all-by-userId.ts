import GetUtils from "dynotxt-common-services/build/utils";
import viewsRepositoryInterface from "../../../adaptor/repositorys/viewsRepositoryInterface";

const caseUserVIewsGetByUserId = async (
  viewsRepository: viewsRepositoryInterface,
  utilService: GetUtils,
  currentUserId: string,
  lastNDays: number
) => {
  if (!currentUserId) throw utilService.createError(400, "UserId is required");
  return await viewsRepository.getAllViewsInLastNDays(currentUserId, lastNDays);
};

export default caseUserVIewsGetByUserId;
