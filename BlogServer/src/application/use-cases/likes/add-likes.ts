import likesRepositoryInterface from "../../../adaptor/repositorys/likesRepositoryInterface";
import Likes from "../../../entities/likes";

const addLikes = async (
  likesRepository: ReturnType<typeof likesRepositoryInterface>,
  createError,
  blogId: string,
  uid: string
) => {
  if (!blogId) throw createError(400, "BlogId is required to like a blog");
  if (!uid) throw createError(400, "Uid is required to like blog");

  let likesDataFromDb: Likes[];
  try {
    likesDataFromDb = await likesRepository.getLikeByUid(blogId, uid);
  } catch (error) {
    throw createError(500, "Faild to fetch likes data");
  }
  console.log(likesDataFromDb);
  throw createError(500, "Faild to fetch likes data");
};

export default addLikes;
