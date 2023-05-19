import GetUtils from "dynotxt-common-services/build/utils";
import reactionRepositoryInterface from "../../../adaptor/repositorys/reactionRepositoryInterface";
import getConfigs from "../../../configs";

const config = getConfigs();

const caseUserReactionLikeGetStatus = async (
  reactionRepository: reactionRepositoryInterface,
  utilsService: GetUtils,
  currentUserId: string,
  blogId: string
) => {
  if (!blogId) throw utilsService.createError(400, "Blog id is required");

  try {
    const blogReaction = currentUserId
      ? await reactionRepository.likesAndUnlikesContByUid(blogId, currentUserId)
      : await reactionRepository.likesAndUnlikesCont(blogId);

    if (!blogReaction) return { status: config.actions.NOTHING };

    return {
      ...blogReaction,
      status:
        blogReaction.status == "like"
          ? config.actions.LIKED
          : blogReaction.status == "dislike"
          ? config.actions.DISLIKED
          : config.actions.NOTHING,
    };
  } catch (error) {
    throw utilsService.createError(500, "Failed to get reaction status");
  }
};

export default caseUserReactionLikeGetStatus;
