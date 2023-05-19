import GetUtils from "dynotxt-common-services/build/utils";
import followsRepositoryInterface from "../../repository/followsRepositoryInterface";

const caseUnfollowUser = async (
  followsRepository: followsRepositoryInterface,
  utilsService: GetUtils,
  currentUserId: string,
  uidToUnfollow: string
) => {
  if (!uidToUnfollow) throw utilsService.createError(400, "You must provide a uid to unfollow");
  if (!currentUserId) throw utilsService.createError(400, "You need to login to unfollow user");

  let existingData = await followsRepository
    .getFollowingDataWithSingleUser(uidToUnfollow, currentUserId)
    .catch(utilsService.throwInternalError());

  if (!existingData) throw utilsService.createError(404, "There is noting to unfollow");

  if (existingData.follower != currentUserId && existingData.following != currentUserId)
    throw utilsService.createError(400, "You dont have permission to change this data");

  return await followsRepository
    .deleteFollowersForSingleConnection(uidToUnfollow, currentUserId)
    .catch(utilsService.throwInternalError("Failed to unfollow"));
};

type caseUnfollowUser = typeof caseUnfollowUser;
export default caseUnfollowUser;
