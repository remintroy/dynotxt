import GetUtils from "dynotxt-common-services/build/utils";
import blogRepositoryInteraface from "../../../adaptor/repositorys/blogRepositoryInteraface";
import commentRepositoryInterface from "../../../adaptor/repositorys/commentRepositoryInterface";
import { CommentContent } from "../../../entities/comments";

const caseUserCommentAddNew = async (
  commentRepository: commentRepositoryInterface,
  blogRepository: blogRepositoryInteraface,
  utilsService: GetUtils,
  blogId: string,
  user: string,
  commentData: CommentContent
) => {
  if (!blogId) throw utilsService.createError(400, "Blog is is required to add comment");
  if (!user) throw utilsService.createError(400, "User is required to add comment");
  if (!commentData?.message) throw utilsService.createError(400, "Comment text is required");
  if (typeof commentData.message !== "string") throw utilsService.createError(400, "Comment text Must be a string");

  // eslint-disable-next-line no-param-reassign
  commentData.message = commentData.message?.trim();

  const blogData = await blogRepository.getBlogById(blogId).catch(utilsService.throwInternalError());
  const comment = await commentRepository.getCommentByBlogId(blogId).catch(utilsService.throwInternalError());

  if (!blogData) throw utilsService.createError(400, "Blog not exist");
  if (!blogData?.published && user !== blogData.author) {
    throw utilsService.createError(400, "You dont have permission to add comment to this blog");
  }

  if (!comment) {
    await commentRepository.createCommentBox({
      blogId: blogData.blogId,
      owner: blogData.author,
    });
  }

  if (comment?.disabled) {
    throw utilsService.createError(400, "Comment box of this blog is disabled");
  }

  return await commentRepository
    .addComment({
      newComment: { message: commentData.message, uid: user },
      blogId,
    })
    .catch(utilsService.throwInternalError("Faild add your create comment"));
};

export default caseUserCommentAddNew;
