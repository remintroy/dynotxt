import GetUtils from "dynotxt-common-services/build/utils";
import getConfigs from "../../../configs";
import { User } from "../../../entities/user.normal";
import followsRepositoryInterface from "../../repository/followsRepositoryInterface";

const config = getConfigs();

const caseGetFollowingStatus = async (
  followsRepository: followsRepositoryInterface,
  utilsService: GetUtils,
  currentUser: User,
  userIdToCkeck: string
) => {
  if (!userIdToCkeck) throw utilsService.createError(400, "UserId is required to check following status");
  if (!currentUser) throw utilsService.createError(400, "UserId is required to check following status");

  const followDataFromDb = await followsRepository
    .getFollowingDataWithSingleUser(userIdToCkeck, currentUser.uid)
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
