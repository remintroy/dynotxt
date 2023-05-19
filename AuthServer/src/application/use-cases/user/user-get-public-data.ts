import GetUtils from "dynotxt-common-services/build/utils";
import { User } from "../../../entities/user.normal";
import followsRepositoryInterface from "../../repository/followsRepositoryInterface";
import userRepositoryInteraface from "../../repository/userRepositoryInteraface";
import caseUserPublicVisibiltyCheck from "./user-public-visiblity-checks";

const getPublicUser = async (
  userRepository: userRepositoryInteraface,
  followsRepository: followsRepositoryInterface,
  utilsService: GetUtils,
  userId: string
) => {
  if (!userId) throw utilsService.createError(400, "User id is required to get user information");

  const userData = await caseUserPublicVisibiltyCheck(userRepository, utilsService, userId);

  const followData = await followsRepository
    .getFollowingAndFollowsCount(userId)
    .catch(utilsService.throwInternalError());

  const output: User = {};

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
