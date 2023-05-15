import followsRepositoryImpl from "../../frameworks/databases/mongoDb/repository/followsRepositoryImpl";

const followsRepositoryInterface = (repository: followsRepositoryImpl) => {
  const addFollowerToUserWithUid = (
    followerUserId: string,
    followingUserId: string,
    accepeted: boolean
  ) =>
    repository.addFollowerToUserWithUid(
      followerUserId,
      followingUserId,
      accepeted
    );

  const getFollowingDataWithSingleUser = (
    followingUserId: string,
    followerUserId: string
  ) =>
    repository.getFollowingDataWithSingleUser(followingUserId, followerUserId);

  const getFollowingAndFollowsCount = (currentUserId: string) =>
    repository.getFollowingAndFollowsCount(currentUserId);

  const deleteFollowersForSingleConnection = async (
    followingUserId: string,
    followerUserId: string
  ) =>
    repository.deleteFollowersForSingleConnection(
      followingUserId,
      followerUserId
    );

  return {
    addFollowerToUserWithUid,
    getFollowingDataWithSingleUser,
    getFollowingAndFollowsCount,
    deleteFollowersForSingleConnection,
  };
};

type followsRepositoryInterface = ReturnType<typeof followsRepositoryInterface>;
export default followsRepositoryInterface;
