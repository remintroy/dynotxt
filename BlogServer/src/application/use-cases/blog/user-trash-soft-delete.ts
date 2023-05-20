import GetUtils from "dynotxt-common-services/build/utils";
import blogRepositoryInteraface from "../../../adaptor/repositorys/blogRepositoryInteraface";

const caseUserBlogSoftDeleteFromTrash = async (
  blogRepository: blogRepositoryInteraface,
  utilsService: GetUtils,
  blogId: string,
  currentUser: string
) => {
  if (!blogId) throw utilsService.createError(400, "BlogId is required");
  if (!currentUser) throw utilsService.createError(400, "AuthorId is required");
  return await blogRepository.softDeleteBlogs(blogId, currentUser).catch(utilsService.throwInternalError());
};

export default caseUserBlogSoftDeleteFromTrash;
