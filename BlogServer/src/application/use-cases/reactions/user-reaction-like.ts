import GetUtils from "dynotxt-common-services/build/utils";
import reactionRepositoryInterface from "../../../adaptor/repositorys/reactionRepositoryInterface";

const caseUserReactionLike = async (
  reactionRepository: reactionRepositoryInterface,
  utilsService: GetUtils,
  currentUserId: string,
  blogId: string
) => {
  if (!blogId) throw utilsService.createError(400, "Blog id is required to add like");
  if (!currentUserId) throw utilsService.createError(400, "Current user id is required to add like");
  try {
    const existingData = await reactionRepository.isRecordExistByUid(blogId, currentUserId);
    if (!existingData) return await reactionRepository.addLike(blogId, currentUserId);
    existingData.value = "like";
    return await existingData.save();
  } catch (error) {
    throw utilsService.createError(500, "Someting went wrong", error);
  }
};

export default caseUserReactionLike;
