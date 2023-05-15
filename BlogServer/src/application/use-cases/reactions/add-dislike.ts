import reactionRepositoryInterface from "../../../adaptor/repositorys/reactionRepositoryInterface";

const caseAddDislike = async (
  reactionRepository: reactionRepositoryInterface,
  createError: any,
  currentUserId: string,
  blogId: string
) => {
  if (!blogId) throw createError(400, "Blog id is required to add dislike");
  if (!currentUserId) throw createError(400, "Current user id is required to add dislike");
  try {
    const existingData = await reactionRepository.isRecordExistByUid(blogId, currentUserId);
    if (!existingData) return await reactionRepository.addDislike(blogId, currentUserId);
    existingData.value = "dislike";
    return await existingData.save();
  } catch (error) {
    throw createError(500, "Faild to dislike blog");
  }
};

type caseAddDislike = typeof caseAddDislike;
export default caseAddDislike;
