import blogRepositoryInteraface from "../../../adaptor/repositorys/blogRepositoryInteraface";
import commentRepositoryInterface from "../../../adaptor/repositorys/commentRepositoryInterface";
import { Blog } from "../../../entities/blog";
import Comment from "../../../entities/comments";

const getComments = async (
  commentRepository: ReturnType<typeof commentRepositoryInterface>,
  blogRepository: ReturnType<typeof blogRepositoryInteraface>,
  createError,
  blogId: string,
  user: string
) => {
  if (!blogId) throw createError(400, "Blog is is required to add comment");
  if (user && typeof user !== "string")
    throw createError(400, "User must be a string");

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
      "You dont have permission to access comment to this blog"
    );
  }

  if (!comment) {
    return [];
  }

  return comment.comment;
};

export default getComments;
