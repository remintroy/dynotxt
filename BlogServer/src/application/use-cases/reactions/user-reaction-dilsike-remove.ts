import GetUtils from "dynotxt-common-services/build/utils";
import reactionRepositoryInterface from "../../../adaptor/repositorys/reactionRepositoryInterface";

const caseUserReactionDislikeRemove = async (
  reactionRepository: reactionRepositoryInterface,
  utilsService: GetUtils,
  currentUserId: string,
  blogId: string
) => {
  if (!blogId) throw utilsService.createError(400, "Blog id is required");
  if (!currentUserId) throw utilsService.createError(400, "Current user id is required");
  return await reactionRepository.removeDislike(blogId, currentUserId).catch(utilsService.throwInternalError());
};
 
export default caseUserReactionDislikeRemove;
