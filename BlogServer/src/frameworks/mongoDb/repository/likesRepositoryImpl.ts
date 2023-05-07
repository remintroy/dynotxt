import LikesModel from "../models/likes";

const likesRepositoryImpl = () => {
  const createLikeDocument = async (blogId: string, uid: string) => {
    const response = await new LikesModel({
      blogId,
      likes: [uid],
    }).save();
    return response;
  };

  const addLike = async (blogId: string, uid: string) => {
    const response = await LikesModel.updateOne(
      {
        blogId,
      },
      {
        $push: {
          likes: uid,
        },
      }
    );
    return response;
  };

  const getLikeByUid = async (blogId: string, uid: string) => {
    const response = await LikesModel.aggregate([
      {
        $unset: "likes",
      },
    ]);
    return response;
  };

  return {
    createLikeDocument,
    addLike,
    getLikeByUid,
  };
};

export default likesRepositoryImpl;
