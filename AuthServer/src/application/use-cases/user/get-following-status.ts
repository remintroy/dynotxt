import getConfigs from "../../../configs";
import { IUser } from "../../../entities/user.normal";
import followsRepositoryInterface from "../../repository/followsRepositoryInterface";

const config = getConfigs();

const caseGetFollowingStatus = async (
  followsRepository: followsRepositoryInterface,
  createError: any,
  currentUser: IUser,
  userIdToCkeck: string
) => {
  if (!userIdToCkeck)
    throw createError(400, "UserId is required to check following status");
  if (!currentUser)
    throw createError(400, "UserId is required to check following status");

  try {
    const dataFromDb = await followsRepository.getFollowingDataWithSingleUser(
      userIdToCkeck,
      currentUser.uid
    );

    const output = { status: "" };

    if (!dataFromDb) output.status = config.actions.NOT_FOLLOWING;
    else {
      if (dataFromDb?.accepeted) output.status = config.actions.FOLLOWED;
      if (!dataFromDb?.accepeted)
        output.status = config.actions.FOLLOW_REQUESTED;
    }

    return output;
  } catch (error) {
    throw createError(400, "Faild to check following status");
  }
};

type caseGetFollowingStatus = typeof caseGetFollowingStatus;
export default caseGetFollowingStatus;
