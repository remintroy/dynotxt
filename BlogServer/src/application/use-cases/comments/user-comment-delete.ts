import GetUtils from "dynotxt-common-services/build/utils";
import blogRepositoryInteraface from "../../../adaptor/repositorys/blogRepositoryInteraface";
import commentRepositoryInterface from "../../../adaptor/repositorys/commentRepositoryInterface"; 

const caseUserCommentDelete = async (
  commentRepository: ReturnType<typeof commentRepositoryInterface>,
  blogRepository: ReturnType<typeof blogRepositoryInteraface>,
  utilsService: GetUtils,
  blogId: string,
  user: string,
  commentId: string
) => {
  if (!blogId) throw utilsService.createError(400, "Blog is is required to add comment");
  if (!user) throw utilsService.createError(400, "User must be a string");

  const blogData = await blogRepository.getBlogById(blogId).catch(utilsService.throwInternalError());
  const comment = await commentRepository.getCommentByBlogId(blogId).catch(utilsService.throwInternalError());

  if (!blogData) throw utilsService.createError(400, "Blog not exist");
  if (!comment) {
    throw utilsService.createError(400, "There is nothing to delete");
  }

  const currentComment = comment.comment.filter(
    // eslint-disable-next-line no-underscore-dangle
    (e) => `${e._id}` === `${commentId}`
  )?.[0];

  if (!blogData?.published) {
    if (user !== blogData.author) {
      throw utilsService.createError(400, "You dont have permission to access comment to this blog");
    }
    // eslint-disable-next-line no-underscore-dangle
  } else if (user !== `${currentComment.uid}`) {
    throw utilsService.createError(400, "You dont have permission to access comment to this blog");
  }

  return await commentRepository
    .deleteComment(blogId, commentId)
    .catch(utilsService.throwInternalError("Faild to delete comment"));
};

export default caseUserCommentDelete;
