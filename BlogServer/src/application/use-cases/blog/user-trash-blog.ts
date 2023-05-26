import GetUtils from "dynotxt-common-services/build/utils";
import blogRepositoryInteraface from "../../../adaptor/repositorys/blogRepositoryInteraface";

const caseUserBlogMoveToTrash = async (
  blogRepository: blogRepositoryInteraface,
  utilsService: GetUtils,
  currentUserId: string,
  blogId: string
) => {
  if (!currentUserId) throw utilsService.createError(400, "Authenticated user id is required");
  if (!blogId) throw utilsService.createError(400, "Blog id is required to trash blog");

  const existingBlogData = await blogRepository
    .getBlogByIdPrivate(blogId, currentUserId)
    .catch(utilsService.throwInternalError());

  if (!existingBlogData) throw utilsService.createError(400, "Blog not found");

  if (existingBlogData.author !== currentUserId)
    throw utilsService.createError(403, "You dont have permission to trash this blog");

  if (existingBlogData.trashed) throw utilsService.createError(400, "Blog already trashed");

  return await blogRepository.trashBlogById(blogId).catch(utilsService.throwInternalError("Faild to trash blog"));
};

export default caseUserBlogMoveToTrash;
