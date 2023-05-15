import reactionRepositoryImpl from "../../frameworks/mongoDb/repository/reactionsRepositoryImpl";

const reactionRepositoryInterface = (repository: reactionRepositoryImpl) => {
  const addLike = repository.addLike;
  const addDislike = repository.addDislike;
  const removeLike = repository.removeLike;
  const removeDislike = repository.removeDislike;
  const isLikedByUid = repository.isLikedByUid;
  const isDislikedByUid = repository.isDislikedByUid;
  const isRecordExistByUid = repository.isRecordExistByUid;
  const likesAndUnlikesCont = repository.likesAndUnlikesCont;
  const likesAndUnlikesContByUid = repository.likesAndUnlikesContByUid;
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

type reactionRepositoryInterface = ReturnType<typeof reactionRepositoryInterface>;
export default reactionRepositoryInterface;
