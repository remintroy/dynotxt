import { IUser } from "../../../entities/user.normal";
import followsRepositoryInterface from "../../repository/followsRepositoryInterface";

const caseUnfollowUser = async (
  followsRepository: followsRepositoryInterface,
  createError: any,
  currentUser: IUser,
  uidToUnfollow: string
) => {
  if (!uidToUnfollow)
    throw createError(400, "You must provide a uid to unfollow");

  if (!currentUser)
    throw createError(400, "You need to login to unfollow user");

  let existingData = await followsRepository
    .getFollowingDataWithSingleUser(uidToUnfollow, currentUser.uid)
    .catch((error) => {
      throw createError(400, "Faild to fetch nessosery data");
    });

  if (!existingData) throw createError(404, "There is noting to unfollow");

  if (
    existingData.follower != currentUser.uid &&
    existingData.following != currentUser.uid
  )
    throw createError(400, "You dont have permission to change this data");

  return await followsRepository
    .deleteFollowersForSingleConnection(uidToUnfollow, currentUser.uid)
    .catch((error) => {
      throw createError(400, "Faild to unfollow");
    });
};

type caseUnfollowUser = typeof caseUnfollowUser;
export default caseUnfollowUser;
