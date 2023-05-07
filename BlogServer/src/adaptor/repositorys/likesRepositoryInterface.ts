import likesRepositoryImpl from "../../frameworks/mongoDb/repository/likesRepositoryImpl";

const likesRepositoryInterface = (
  repository: ReturnType<typeof likesRepositoryImpl>
) => {
  const createLikeDocument = (blogId: string, uid: string) =>
    repository.createLikeDocument(blogId, uid);

  const addLike = (blogId: string, uid: string) =>
    repository.addLike(blogId, uid);

  const getLikeByUid = (blogId: string, uid: string) =>
    repository.getLikeByUid(blogId, uid);

  return {
    createLikeDocument,
    addLike,
    getLikeByUid,
  };
};

export default likesRepositoryInterface;
