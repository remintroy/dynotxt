import reactionRepositoryInterface from "../../../adaptor/repositorys/reactionRepositoryInterface";

const caseRemoveLike = async (
  reactionRepository: reactionRepositoryInterface,
  createError: any,
  currentUserId: string,
  blogId: string
) => {
  if (!blogId) throw createError(400, "Blog id is required");
  if (!currentUserId) throw createError(400, "Current user id is required");

  try {
    return await reactionRepository.removeLike(blogId, currentUserId);
  } catch (error) {
    throw createError(500, "Faild to remove like");
  }
};

type caseRemoveLike = typeof caseRemoveLike;
export default caseRemoveLike;
