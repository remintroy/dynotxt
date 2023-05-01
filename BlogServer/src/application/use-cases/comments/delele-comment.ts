import blogRepositoryInteraface from "../../../adaptor/repositorys/blogRepositoryInteraface";
import commentRepositoryInterface from "../../../adaptor/repositorys/commentRepositoryInterface";
import { Blog } from "../../../entities/blog";
import Comment from "../../../entities/comments";

const deleteComment = async (
  commentRepository: ReturnType<typeof commentRepositoryInterface>,
  blogRepository: ReturnType<typeof blogRepositoryInteraface>,
  createError,
  blogId: string,
  user: string,
  commentId: string
) => {
  if (!blogId) throw createError(400, "Blog is is required to add comment");
  if (!user) throw createError(400, "User must be a string");

  let blogData: Blog;
  let comment: Comment;

  try {
    blogData = await blogRepository.getBlogById(blogId);
    comment = await commentRepository.getCommentByBlogId(blogId);
  } catch (error) {
    throw createError(400, "Faild to fetch nessory data");
  }

  if (!blogData) throw createError(400, "Blog not exist");
  if (!comment) {
    throw createError(400, "There is nothing to delete");
  }

  const currentComment = comment.comment.filter(
    // eslint-disable-next-line no-underscore-dangle
    (e) => `${e._id}` === `${commentId}`
  )?.[0];

  if (!blogData?.published) {
    if (user !== blogData.author) {
      throw createError(
        400,
        "You dont have permission to access comment to this blog"
      );
    }
    // eslint-disable-next-line no-underscore-dangle
  } else if (user !== `${currentComment.uid}`) {
    throw createError(
      400,
      "You dont have permission to access comment to this blog"
    );
  }

  try {
    return await commentRepository.deleteComment(blogId, commentId);
  } catch (error) {
    throw createError(500, "Faild to delete comment");
  }
};

export default deleteComment;
