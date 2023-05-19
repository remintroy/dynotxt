import GetUtils from "dynotxt-common-services/build/utils";
import reactionRepositoryInterface from "../../../adaptor/repositorys/reactionRepositoryInterface";

const caseUserReactionDislike = async (
  reactionRepository: reactionRepositoryInterface,
  utilsService: GetUtils,
  currentUserId: string,
  blogId: string
) => {
  if (!blogId) throw utilsService.createError(400, "Blog id is required to add dislike");
  if (!currentUserId) throw utilsService.createError(400, "Current user id is required to add dislike");
  try {
    const existingData = await reactionRepository.isRecordExistByUid(blogId, currentUserId);
    if (!existingData) return await reactionRepository.addDislike(blogId, currentUserId);
    existingData.value = "dislike";
    return await existingData.save();
  } catch (error) {
    throw utilsService.createError(500, "Someting went wrong", error);
  }
};

export default caseUserReactionDislike;
