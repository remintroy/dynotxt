import getConfigs from "../../../configs";
import { IUser } from "../../../entities/user.normal";
import followsRepositoryInterface from "../../repository/followsRepositoryInterface";
import userRepositoryInteraface from "../../repository/userRepositoryInteraface";

const config = getConfigs();

const caseAddNewFollow = async (
  followsRepository: followsRepositoryInterface,
  userRepository: userRepositoryInteraface,
  createError: any,
  currentUser: IUser,
  userIdToFollow: string
) => {
  if (!userIdToFollow)
    throw createError(400, "User is required to follow user");

  if (currentUser.uid === userIdToFollow)
    throw createError(400, "You cannot follow yourself");

  try {
    const existingUser = await userRepository.getById(userIdToFollow);

    if (!existingUser)
      throw createError(400, "The user you are tying to follow not exist");

    const existingData = await followsRepository.getFollowingDataWithSingleUser(
      userIdToFollow,
      currentUser.uid
    );

    if (!existingData) {
      if (existingUser.privateAccount) {
        await followsRepository.addFollowerToUserWithUid(
          currentUser.uid,
          userIdToFollow,
          false
        );
        return { status: config.actions.FOLLOW_REQUESTED };
      }
      await followsRepository.addFollowerToUserWithUid(
        currentUser.uid,
        userIdToFollow,
        true
      );
      return { status: config.actions.FOLLOWED };
    }

    return { status: config.actions.FOLLOWED };
  } catch (error) {
    throw createError(500, "Failed to follow user");
  }
};

type caseAddNewFollow = typeof caseAddNewFollow;
export default caseAddNewFollow;
