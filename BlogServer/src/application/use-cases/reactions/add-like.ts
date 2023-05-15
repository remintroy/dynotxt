import reactionRepositoryInterface from "../../../adaptor/repositorys/reactionRepositoryInterface";

const caseAddLike = async (
  reactionRepository: reactionRepositoryInterface,
  createError: any,
  currentUserId: string,
  blogId: string
) => {
  if (!blogId) throw createError(400, "Blog id is required to add like");
  if (!currentUserId) throw createError(400, "Current user id is required to add like");
  try {
    const existingData = await reactionRepository.isRecordExistByUid(blogId, currentUserId);
    if (!existingData) return await reactionRepository.addLike(blogId, currentUserId);
    existingData.value = "like";
    return await existingData.save();
  } catch (error) {
    throw createError(500, "Faild to like blog");
  }
};

type caseAddLike = typeof caseAddLike;
export default caseAddLike;
