import FollowsModel from "../models/follows";

const followsRepositoryImpl = () => {
  const addFollowerToUserWithUid = async (followerUserId: string, followingUserId: string, accepeted: boolean) => {
    const response = await new FollowsModel({
      following: followingUserId,
      follower: followerUserId,
      accepeted: accepeted ?? false,
    }).save();
    return response;
  };

  const getFollowingDataWithSingleUser = async (followingUserId: string, followerUserId: string) => {
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

  const deleteFollowersForSingleConnection = async (followingUserId: string, followerUserId: string) => {
    return await FollowsModel.deleteOne({
      follower: followerUserId,
      following: followingUserId,
    });
  };

  const followersInLastNDays = async (userId: string, lastNDays: number) => {
    const currentDate: any = new Date();
    const calulatedDate = currentDate - (lastNDays ?? 10) * 60 * 60 * 24 * 1000;
    return await FollowsModel.aggregate([
      { $match: { following: userId, createdAt: { $gte: new Date(calulatedDate) } } },
      {
        $group: {
          _id: {
            $dateToString: {
              format: "%d-%m-%Y",
              date: "$createdAt",
            },
          },
          count: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          date: "$_id",
          count: 1,
        },
      },
      { $sort: { date: 1 } },
    ]);
  };

  return {
    addFollowerToUserWithUid,
    getFollowingDataWithSingleUser,
    getFollowingAndFollowsCount,
    deleteFollowersForSingleConnection,
    followersInLastNDays,
  };
};

type followsRepositoryImpl = ReturnType<typeof followsRepositoryImpl>;
export default followsRepositoryImpl;
