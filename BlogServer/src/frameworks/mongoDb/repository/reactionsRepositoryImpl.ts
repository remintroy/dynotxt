import ReactionModel from "../models/reactions";

const reactionRepositoryImpl = () => {
  const addLike = async (blogId: string, userId: string) => {
    return await new ReactionModel({ blogId, userId, value: "like" }).save();
  };

  const addDislike = async (blogId: string, userId: string) => {
    return await new ReactionModel({ blogId, userId, value: "dislike" }).save();
  };

  const removeLike = async (blogId: string, userId: string) => {
    return await ReactionModel.deleteOne({ blogId, userId, value: "like" });
  };

  const removeDislike = async (blogId: string, userId: string) => {
    return await ReactionModel.deleteOne({ blogId, userId, value: "dislike" });
  };

  const isLikedByUid = async (blogId: string, userId: string) => {
    return await ReactionModel.findOne({ blogId, userId, value: "like" });
  };

  const isDislikedByUid = async (blogId: string, userId: string) => {
    return await ReactionModel.findOne({ blogId, userId, value: "dislike" });
  };

  const isRecordExistByUid = async (blogId: string, userId: string) => {
    return await ReactionModel.findOne({ blogId, userId });
  };

  const likesAndUnlikesCont = async (blogId: string) => {
    const result = await ReactionModel.aggregate([
      {
        $facet: {
          likes: [
            { $match: { value: "like", blogId } },
            { $group: { _id: "", count: { $sum: 1 } } },
            { $project: { _id: 0 } },
          ],
          dislikes: [
            { $match: { value: "dislike", blogId } },
            { $group: { _id: "", count: { $sum: 1 } } },
            { $project: { _id: 0 } },
          ],
        },
      },
    ]);

    const output = {
      likes: result?.[0]?.likes?.[0]?.count ?? 0,
      dislikes: result?.[0]?.dislikes?.[0]?.count ?? 0,
      status: "",
    };

    return output;
  };

  const likesAndUnlikesContByUid = async (blogId: string, userId: string) => {
    const result = await ReactionModel.aggregate([
      {
        $facet: {
          likes: [
            { $match: { value: "like", blogId } },
            { $group: { _id: "", count: { $sum: 1 } } },
            { $project: { _id: 0 } },
          ],
          dislikes: [
            { $match: { value: "dislike", blogId } },
            { $group: { _id: "", count: { $sum: 1 } } },
            { $project: { _id: 0 } },
          ],
          status: [
            {
              $match: {
                blogId,
                userId,
              },
            },
          ],
        },
      },
    ]);

    const output = {
      likes: result?.[0]?.likes?.[0]?.count ?? 0,
      dislikes: result?.[0]?.dislikes?.[0]?.count ?? 0,
      status: result?.[0]?.status?.[0]?.value,
    };

    return output;
  };

  return {
    addLike,
    addDislike,
    removeLike,
    removeDislike,
    isLikedByUid,
    isDislikedByUid,
    isRecordExistByUid,
    likesAndUnlikesCont,
    likesAndUnlikesContByUid,
  };
};

type reactionRepositoryImpl = ReturnType<typeof reactionRepositoryImpl>;
export default reactionRepositoryImpl;
