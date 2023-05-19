import followsRepositoryImpl from "../../frameworks/databases/mongoDb/repository/followsRepositoryImpl";

const followsRepositoryInterface = (repository: followsRepositoryImpl) => {
  const addFollowerToUserWithUid = repository.addFollowerToUserWithUid;
  const getFollowingDataWithSingleUser = repository.getFollowingDataWithSingleUser;
  const getFollowingAndFollowsCount = repository.getFollowingAndFollowsCount;
  const deleteFollowersForSingleConnection = repository.deleteFollowersForSingleConnection;

  return {
    addFollowerToUserWithUid,
    getFollowingDataWithSingleUser,
    getFollowingAndFollowsCount,
    deleteFollowersForSingleConnection,
  };
};

type followsRepositoryInterface = ReturnType<typeof followsRepositoryInterface>;
export default followsRepositoryInterface;
