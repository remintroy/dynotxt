import FlagsModel from "../models/flags";

const flagsRepositoryImpl = () => {
  const addNewFlag = async (blogId: string, userId: string, reason: string) => {
    return await new FlagsModel({ blogId, userId, reason, status: "created" }).save();
  };

  const removeFlag = async (blogId: string, flagId: string) => {
    return await FlagsModel.deleteOne({ blogId, _id: flagId });
  };

  const removeAllFlagForSingBlog = async (blogId: string) => {
    return await FlagsModel.deleteMany({ blogId });
  };

  const updateStatusFlagsForSingleBlogAsDisabled = async (blogId: string) => {
    return await FlagsModel.updateMany({ blogId }, { $set: { status: "disabled" } });
  };

  const updateStatusFlagsForSingleBlogAsEnabled = async (blogId: string) => {
    return await FlagsModel.updateMany({ blogId }, { $set: { status: "enabled" } });
  };

  const updateFLagStatus = async (blogId: string, flagId: string, status: string) => {
    return await FlagsModel.updateOne(
      { blogId, _id: flagId },
      {
        $set: { status: status },
      }
    );
  };

  const getAllFlaggedBLogs = async () => {
    return await FlagsModel.aggregate([
      {
        $group: {
          _id: "$blogId",
          flags: {
            $push: {
              uid: "$userId",
              reason: "$reason",
              createdAt: "$createdAt",
            },
          },
          count: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: "blogs",
          localField: "_id",
          foreignField: "blogId",
          as: "blog",
          pipeline: [
            {
              $match: {
                disabled: false,
              },
            },
            {
              $project: {
                _id: 0,
                title: 1,
                subtitle: 1,
                author: 1,
                createdAt: 1,
              },
            },
          ],
        },
      },
      {
        $sort: { "flags.createdAt": -1 },
      },
      {
        $project: {
          blogId: "$_id",
          flags: "$flags",
          count: "$count",
          blog: {
            $arrayElemAt: ["$blog", 0],
          },
          _id: 0,
        },
      },
      {
        $match: { blog: { $exists: true, $ne: null } },
      },
    ]);
  };

  const getFlagsForSingleBlog = async (blogId: string) => {
    return await FlagsModel.find({ blogId });
  };

  return {
    addNewFlag,
    removeFlag,
    updateFLagStatus,
    getAllFlaggedBLogs,
    removeAllFlagForSingBlog,
    getFlagsForSingleBlog,
    updateStatusFlagsForSingleBlogAsDisabled,
    updateStatusFlagsForSingleBlogAsEnabled,
  };
};

type flagsRepositoryImpl = ReturnType<typeof flagsRepositoryImpl>;
export default flagsRepositoryImpl;
