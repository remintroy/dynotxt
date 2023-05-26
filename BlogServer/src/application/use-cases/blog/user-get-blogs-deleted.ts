import GetUtils from "dynotxt-common-services/build/utils";
import blogRepositoryInteraface from "../../../adaptor/repositorys/blogRepositoryInteraface";

const caseUserBlogGetTrashed = async (
  blogRepository: blogRepositoryInteraface,
  utilsService: GetUtils,
  userId: string,
  pageNumber: number
) => {
  if (!userId) throw utilsService.createError(401, "You must be logged in to get trashed blogs");

  const blogsOnTrash = await blogRepository
    .getAllDeletedBlogs(userId, pageNumber)
    .catch(utilsService.throwInternalError("Something went wrong while getting deleted blogs"));

  return blogsOnTrash;
};

export default caseUserBlogGetTrashed;
