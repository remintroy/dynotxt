import commentRepositoryImpl from "../../frameworks/mongoDb/repository/commentsRepositoryImpl";

const commentRepositoryInterface = (repository: ReturnType<typeof commentRepositoryImpl>) => {
  const createCommentBox = repository.createCommentBox;
  const addComment = repository.addComment;
  const deleteComment = repository.deleteComment;
  const getCommentByBlogId = repository.getCommentByBlogId;

  return {
    getCommentByBlogId,
    createCommentBox,
    addComment,
    deleteComment,
  };
};

type commentRepositoryInterface = ReturnType<typeof commentRepositoryInterface>;
export default commentRepositoryInterface;
