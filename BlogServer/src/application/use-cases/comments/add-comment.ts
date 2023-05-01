import blogRepositoryInteraface from "../../../adaptor/repositorys/blogRepositoryInteraface";
import commentRepositoryInterface from "../../../adaptor/repositorys/commentRepositoryInterface";
import { Blog } from "../../../entities/blog";
import Comment, { CommentContent } from "../../../entities/comments";

const addComment = async (
  commentRepository: ReturnType<typeof commentRepositoryInterface>,
  blogRepository: ReturnType<typeof blogRepositoryInteraface>,
  createError,
  blogId: string,
  user: string,
  commentData: CommentContent
) => {
  if (!blogId) throw createError(400, "Blog is is required to add comment");
  if (!user) throw createError(400, "User is required to add comment");
  if (!commentData?.message) throw createError(400, "Comment text is required");
  if (typeof commentData.message !== "string")
    throw createError(400, "Comment text Must be a string");

  // eslint-disable-next-line no-param-reassign
  commentData.message = commentData.message?.trim();

  let blogData: Blog;
  let comment: Comment;

  try {
    blogData = await blogRepository.getBlogById(blogId);
    comment = await commentRepository.getCommentByBlogId(blogId);
  } catch (error) {
    throw createError(400, "Faild to fetch nessory data");
  }

  if (!blogData) throw createError(400, "Blog not exist");
  if (!blogData?.published && user !== blogData.author) {
    throw createError(
      400,
      "You dont have permission to add comment to this blog"
    );
  }

  if (!comment) {
    await commentRepository.createCommentBox({
      blogId: blogData.blogId,
      owner: blogData.author,
    });
  }

  if (comment?.disabled) {
    throw createError(400, "Comment box of this blog is disabled");
  }

  try {
    return await commentRepository.addComment({
      newComment: { message: commentData.message, uid: user },
      blogId,
    });
  } catch (error) {
    throw createError(500, "Faild add your create comment");
  }
};

export default addComment;
