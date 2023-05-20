import GetUtils from "dynotxt-common-services/build/utils";
import blogRepositoryInteraface from "../../../adaptor/repositorys/blogRepositoryInteraface";

const caseUserBlogRecoverFromTrash = async (
  blogRepository: blogRepositoryInteraface,
  utilsService: GetUtils,
  currentUserId: string,
  blogId: string
) => {
  if (!blogId) throw utilsService.createError(400, "BlogId Is required to restore blog");

  const existingData = await blogRepository
    .getDeleteBlog(currentUserId, blogId)
    .catch(utilsService.throwInternalError());

  if (!existingData) throw utilsService.createError(404, "Blog not found");

  await blogRepository
    .recoverTrashedBlogById(blogId)
    .catch(utilsService.throwInternalError("Error while recovering blog"));
};

export default caseUserBlogRecoverFromTrash;
