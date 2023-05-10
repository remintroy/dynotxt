import blogRepositoryInteraface from "../../../adaptor/repositorys/blogRepositoryInteraface";
import { Blog } from "../../../entities/blog";

const caseGetAllBlogs = async (
  blogRepository: blogRepositoryInteraface,
  createError,
  currentUserId: string,
  userId: string
) => {
  //
  if (!userId) throw createError(400, "Blog id is required");

  console.log(userId, currentUserId)

  let blogsDataFromDb: Blog[];
  try {
    blogsDataFromDb =
      currentUserId === userId
        ? await blogRepository.getAllBlogsDisplayWithUidWithPrivate(userId)
        : await blogRepository.getAllBlogsDisplayWithUid(userId);
  } catch (error) {
    throw createError(500, "Faild to fetch blog from server", error?.message);
  }

  return blogsDataFromDb;
};

export default caseGetAllBlogs;
