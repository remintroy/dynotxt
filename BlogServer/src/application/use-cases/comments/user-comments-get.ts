import GetUtils from "dynotxt-common-services/build/utils";
import blogRepositoryInteraface from "../../../adaptor/repositorys/blogRepositoryInteraface";
import commentRepositoryInterface from "../../../adaptor/repositorys/commentRepositoryInterface";

const caseUserCommentsGet = async (
  commentRepository: ReturnType<typeof commentRepositoryInterface>,
  blogRepository: ReturnType<typeof blogRepositoryInteraface>,
  utilsService: GetUtils,
  blogId: string,
  user: string
) => {
  if (!blogId) throw utilsService.createError(400, "Blog is is required to add comment");
  if (user && typeof user !== "string") throw utilsService.createError(400, "User must be a string");

  let blogData = await blogRepository.getBlogById(blogId).catch(utilsService.throwInternalError());
  if (!blogData)
    blogData = await blogRepository.getBlogByIdPrivate(blogId, user).catch(utilsService.throwInternalError());
  const comment = await commentRepository.getCommentByBlogId(blogId).catch(utilsService.throwInternalError());

  if (!blogData) throw utilsService.createError(400, "Blog not exist");
  if (!blogData?.published && user !== blogData.author) {
    throw utilsService.createError(400, "You dont have permission to access comment to this blog");
  }

  return comment?.comment ?? [];
};

export default caseUserCommentsGet;
