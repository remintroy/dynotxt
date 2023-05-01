import Comment from "../../entities/comments";
import commentRepositoryImpl from "../../frameworks/mongoDb/repository/commentsRepositoryImpl";

const commentRepositoryInterface = (
  repository: ReturnType<typeof commentRepositoryImpl>
) => {
  const createCommentBox = (commentData: Comment) =>
    repository.createCommentBox(commentData);

  const addComment = (commentData: Comment) =>
    repository.addComment(commentData);

  const deleteComment = (blogId: string, commentId: string) =>
    repository.deleteComment(blogId, commentId);

  const getCommentByBlogId = (blogId: string) =>
    repository.getCommentByBlogId(blogId);

  return {
    getCommentByBlogId,
    createCommentBox,
    addComment,
    deleteComment,
  };
};

export default commentRepositoryInterface;
