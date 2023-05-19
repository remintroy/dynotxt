import GetUtils from "dynotxt-common-services/build/utils";
import getConfigs from "../../../configs"; 
import followsRepositoryInterface from "../../repository/followsRepositoryInterface";

const config = getConfigs();

const caseGetFollowingStatus = async (
  followsRepository: followsRepositoryInterface,
  utilsService: GetUtils,
  currentUserId: string,
  userIdToCkeck: string
) => {
  if (!userIdToCkeck) throw utilsService.createError(400, "UserId is required to check following status");
  if (!currentUserId) throw utilsService.createError(400, "UserId is required to check following status");

  const followDataFromDb = await followsRepository
    .getFollowingDataWithSingleUser(userIdToCkeck, currentUserId)
    .catch(utilsService.throwInternalError("Faild to check following status"));

  const output = { status: "" };

  if (!followDataFromDb) {
    output.status = config.actions.NOT_FOLLOWING;
  } else {
    if (followDataFromDb?.accepeted) output.status = config.actions.FOLLOWED;
    if (!followDataFromDb?.accepeted) output.status = config.actions.FOLLOW_REQUESTED;
  }

  return output;
};

type caseGetFollowingStatus = typeof caseGetFollowingStatus;
export default caseGetFollowingStatus;
