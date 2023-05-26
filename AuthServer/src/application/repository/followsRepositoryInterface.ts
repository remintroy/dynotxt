import followsRepositoryImpl from "../../frameworks/databases/mongoDb/repository/followsRepositoryImpl";

const followsRepositoryInterface = (repository: followsRepositoryImpl) => {
  const addFollowerToUserWithUid = repository.addFollowerToUserWithUid;
  const getFollowingDataWithSingleUser = repository.getFollowingDataWithSingleUser;
  const getFollowingAndFollowsCount = repository.getFollowingAndFollowsCount;
  const deleteFollowersForSingleConnection = repository.deleteFollowersForSingleConnection;
  const followersInLastNDays = repository.followersInLastNDays;

  return {
    addFollowerToUserWithUid,
    getFollowingDataWithSingleUser,
    getFollowingAndFollowsCount,
    deleteFollowersForSingleConnection,
    followersInLastNDays,
  };
};

type followsRepositoryInterface = ReturnType<typeof followsRepositoryInterface>;
export default followsRepositoryInterface;
