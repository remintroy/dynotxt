import { IUser } from "../../../entities/user.normal";
import followsRepositoryInterface from "../../repository/followsRepositoryInterface";
import userRepositoryInteraface from "../../repository/userRepositoryInteraface";

const getPublicUser = async (
  userRepository: userRepositoryInteraface,
  followsRepository: followsRepositoryInterface,
  createError,
  userId: string
) => {
  if (!userId)
    throw createError(400, "User id is required to get user information");

  let userData: IUser;

  try {
    userData = await userRepository.getById(userId);
  } catch (error) {
    throw createError(500, "Faild to fetch user information");
  }
  if (!userData) throw createError(400, "User with this not exits");

  let followData: { following: number; followers: number };
  try {
    followData = await followsRepository.getFollowingAndFollowsCount(userId);
  } catch (error) {
    throw createError(400, error.message);
  }

  const output: IUser = {};

  output.privateAccount = userData.privateAccount;
  output.name = userData?.name ?? userData.email.split("@")[0];
  output.photoURL = userData.photoURL;
  output.uid = userData.uid;
  output.following = followData.following;
  output.followers = followData.followers;
  output.bio = userData?.bio ?? `Hey there... its me ${output.name} 😎`;

  return output;
};

export default getPublicUser;
