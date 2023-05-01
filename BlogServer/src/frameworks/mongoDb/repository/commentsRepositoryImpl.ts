import Comment, { CommentContentReplays } from "../../../entities/comments";
import CommentModel from "../models/comments";

const commentRepositoryImpl = () => {
  const createCommentBox = async (commentData: Comment) => {
    const { blogId, owner } = commentData;
    const response = await new CommentModel({
      blogId,
      owner,
    }).save();
    return response;
  };

  const addComment = async (commentData: Comment) => {
    const { blogId, newComment } = commentData;
    console.log(commentData);
    const response = await CommentModel.updateOne(
      { blogId },
      {
        $push: {
          comment: newComment,
        },
      }
    );
    return response;
  };

  const addCommentReplay = async (
    blogId: string,
    commentIndex: number,
    commentReplay: CommentContentReplays
  ) => {
    const response = await CommentModel.updateOne(
      { blogId },
      {
        $push: {
          [`comment.${commentIndex}.replays`]: commentReplay,
        },
      }
    );
    return response;
  };

  const deleteComment = async (blogId: string, commentId: string) => {
    const response = await CommentModel.updateOne(
      { blogId },
      {
        $pull: {
          comment: {
            _id: commentId,
          },
        },
      }
    );
    return response;
  };

  const getCommentByBlogId = async (blogId: string) => {
    const response = await CommentModel.findOne({ blogId });
    return response;
  };

  return {
    getCommentByBlogId,
    createCommentBox,
    addComment,
    addCommentReplay,
    deleteComment,
  };
};

export default commentRepositoryImpl;
