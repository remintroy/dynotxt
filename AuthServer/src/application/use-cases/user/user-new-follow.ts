import GetUtils from "dynotxt-common-services/build/utils";
import getConfigs from "../../../configs";
import followsRepositoryInterface from "../../repository/followsRepositoryInterface";
import userRepositoryInteraface from "../../repository/userRepositoryInteraface";

const config = getConfigs();

const caseAddNewFollow = async (
  followsRepository: followsRepositoryInterface,
  userRepository: userRepositoryInteraface,
  utilsService: GetUtils,
  currentUserId: string,
  userIdToFollow: string
) => {
  if (!userIdToFollow) throw utilsService.createError(400, "User is required to follow user");
  if (currentUserId == userIdToFollow) throw utilsService.createError(400, "You cannot follow yourself");

  const userDataToFollowFromDb = await userRepository.getById(userIdToFollow).catch(utilsService.throwInternalError());
  const followDataFromDb = await followsRepository
    .getFollowingDataWithSingleUser(userIdToFollow, currentUserId)
    .catch(utilsService.throwInternalError());

  if (!userDataToFollowFromDb) throw utilsService.createError(400, "The user you are tying to follow not exist");

  if (!followDataFromDb) {
    if (userDataToFollowFromDb?.privateAccount) {
      await followsRepository
        .addFollowerToUserWithUid(currentUserId, userIdToFollow, false)
        .catch(utilsService.throwInternalError());
      return { status: config.actions.FOLLOW_REQUESTED };
    }
    await followsRepository
      .addFollowerToUserWithUid(currentUserId, userIdToFollow, true)
      .catch(utilsService.throwInternalError());
    return { status: config.actions.FOLLOWED };
  }

  return { status: config.actions.FOLLOWED };
};

type caseAddNewFollow = typeof caseAddNewFollow;
export default caseAddNewFollow;
