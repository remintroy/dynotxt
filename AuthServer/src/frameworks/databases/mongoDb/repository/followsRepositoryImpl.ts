import FollowsModel from "../models/follows";

const followsRepositoryImpl = () => {
  const addFollowerToUserWithUid = async (
    followerUserId: string,
    followingUserId: string,
    accepeted: boolean
  ) => {
    const response = await new FollowsModel({
      following: followingUserId,
      follower: followerUserId,
      accepeted: accepeted ?? false,
    }).save();
    return response;
  };

  const getFollowingDataWithSingleUser = async (
    followingUserId: string,
    followerUserId: string
  ) => {
    const response = await FollowsModel.findOne({
      follower: followerUserId,
      following: followingUserId,
    });
    return response;
  };

  const getFollowingAndFollowsCount = async (currentUserId: string) => {
    const response = await FollowsModel.aggregate([
      {
        $facet: {
          following: [
            {
              $match: {
                following: currentUserId,
                accepeted: true,
                isBlocked: false,
              },
            },
            { $count: "following" },
          ],
          followers: [
            {
              $match: {
                follower: currentUserId,
                accepeted: true,
                isBlocked: false,
              },
            },
            { $count: "follower" },
          ],
        },
      },
    ]);

    const output = {
      following: response?.[0]?.following?.[0]?.following ?? 0,
      followers: response?.[0]?.followers?.[0]?.follower ?? 0,
    };
    return output;
  };

  return {
    addFollowerToUserWithUid,
    getFollowingDataWithSingleUser,
    getFollowingAndFollowsCount,
  };
};

type followsRepositoryImpl = ReturnType<typeof followsRepositoryImpl>;
export default followsRepositoryImpl;
