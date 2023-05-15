import addNewBlog from "../../application/use-cases/blog/add-blog";
import createUploadUrl from "../../application/use-cases/blog/create-upload-url";
import caseDeleteBlog from "../../application/use-cases/blog/delete-blog";
import caseGetAllBlogs from "../../application/use-cases/blog/get-all-blogs";
import getBlogData from "../../application/use-cases/blog/get-blog";
import getBlogDataToEdit from "../../application/use-cases/blog/get-blog-edit";
import caseGetBlogForHome from "../../application/use-cases/blog/get-blog-for-home";
import caseGetDeleteBlogs from "../../application/use-cases/blog/get-deleted-blogs";
import publishBlog from "../../application/use-cases/blog/publish-blog";
import caseRecoverTrashedBlogs from "../../application/use-cases/blog/restore-deleted-blogs";
import unPublishBlog from "../../application/use-cases/blog/unpublish-blog";
import updateBlog from "../../application/use-cases/blog/update-blog";
import addComment from "../../application/use-cases/comments/add-comment";
import deleteComment from "../../application/use-cases/comments/delele-comment";
import getComments from "../../application/use-cases/comments/get-comments";
import caseAddNewFlag from "../../application/use-cases/flags/add-flags-to-blog";
import caseAddDislike from "../../application/use-cases/reactions/add-dislike";
import caseAddLike from "../../application/use-cases/reactions/add-like";
import caseGetBlogReactionStatus from "../../application/use-cases/reactions/get-blog-like-status";
import caseRemoveDislike from "../../application/use-cases/reactions/remove-dislike";
import caseRemoveLike from "../../application/use-cases/reactions/remove-like";
import { RequestWithUser } from "../../frameworks/webserver/express";
import blogRepositoryInteraface from "../repositorys/blogRepositoryInteraface";
import commentRepositoryInterface from "../repositorys/commentRepositoryInterface";
import flagsRepositoryInterface from "../repositorys/flagsRepositoryInterface";
import reactionRepositoryInterface from "../repositorys/reactionRepositoryInterface";
import blogServiceInterface from "../service";

const userController = (
  blogRepository: blogRepositoryInteraface,
  blogService: blogServiceInterface,
  reactionRepository: reactionRepositoryInterface,
  flagsRepository: flagsRepositoryInterface,
  commentRepository: commentRepositoryInterface,
  createError: any
) => {
  // create new blog which is currently a draft
  const postUserNewBlog = async (req: RequestWithUser) => {
    const userId = req.user;
    const blogData = req.body;
    return await addNewBlog(blogRepository, blogService, createError, blogData, userId);
  };

  const getUserBlogUploadUrl = async (req: RequestWithUser) => {
    const blogId = req.params.id;
    const author = req.user;
    return await createUploadUrl(blogRepository, blogService, createError, blogId, author);
  };

  const putUserUpdateBlog = async (req: RequestWithUser) => {
    const blogId = req.params.id;
    const author = req.user;
    const blogData = req.body;
    return await updateBlog(blogRepository, createError, blogId, author, blogData);
  };

  const getUserBlogData = async (req: RequestWithUser) => {
    const { user } = req;
    const blogId = req.params.id;
    return await getBlogData(blogRepository, createError, blogId, user);
  };

  const getUserBlogDataForEdit = async (req: RequestWithUser) => {
    const { user } = req;
    const blogId = req.params.id;
    return await getBlogDataToEdit(blogRepository, createError, blogId, user);
  };

  const putUserPublishBlog = async (req: RequestWithUser) => {
    const { user } = req;
    const blogId = req.params.id;
    return await publishBlog(blogRepository, createError, blogId, user);
  };

  const putUserComment = async (req: RequestWithUser) => {
    const { user } = req;
    const blogId = req.params.id;
    const commentData = req.body;
    return await addComment(commentRepository, blogRepository, createError, blogId, user, commentData);
  };

  const getUserBlogComments = async (req: RequestWithUser) => {
    const { user } = req;
    const blogId = req.params.id;
    return await getComments(commentRepository, blogRepository, createError, blogId, user);
  };

  const deleteUserBlogComment = async (req: RequestWithUser) => {
    const { user } = req;
    const blogId = req.params.id;
    const commentId = req.params.cid;
    return await deleteComment(commentRepository, blogRepository, createError, blogId, user, commentId);
  };

  const getAllBlogsDisplay = async (req: RequestWithUser) => {
    const { user } = req;
    const userId = req.params.id;
    return await caseGetAllBlogs(blogRepository, createError, user, userId);
  };

  const putUserUnpublishBlog = async (req: RequestWithUser) => {
    const { user } = req;
    const blogId = req.params.id;
    return await unPublishBlog(blogRepository, createError, blogId, user);
  };

  const deleteUserBlog = async (req: RequestWithUser) => {
    const { user } = req;
    const blogId = req.params.id;
    return await caseDeleteBlog(blogRepository, createError, user, blogId);
  };

  const getDeletedBlogs = async (req: RequestWithUser) => {
    const { user } = req;
    return await caseGetDeleteBlogs(blogRepository, createError, user);
  };

  const putRecoverDeletedBlog = async (req: RequestWithUser) => {
    const { user } = req;
    const blogId = req.params.id;
    return await caseRecoverTrashedBlogs(blogRepository, createError, user, blogId);
  };

  const getAllBlogsForHome = async () => {
    return await caseGetBlogForHome(blogRepository, createError);
  };

  const putUserLikeBlog = async (req: RequestWithUser) => {
    const { user } = req;
    const blogId = req.params.id;
    return await caseAddLike(reactionRepository, createError, user, blogId);
  };

  const deleteLikeBlog = async (req: RequestWithUser) => {
    const { user } = req;
    const blogId = req.params.id;
    return await caseRemoveLike(reactionRepository, createError, user, blogId);
  };

  const putUserDislikeBlog = async (req: RequestWithUser) => {
    const { user } = req;
    const blogId = req.params.id;
    return await caseAddDislike(reactionRepository, createError, user, blogId);
  };

  const deleteUserDislikeBlog = async (req: RequestWithUser) => {
    const { user } = req;
    const blogId = req.params.id;
    return await caseRemoveDislike(reactionRepository, createError, user, blogId);
  };

  const getBlogReactionStatus = async (req: RequestWithUser) => {
    const { user } = req;
    const blogId = req.params.id;
    return await caseGetBlogReactionStatus(reactionRepository, createError, user, blogId);
  };

  const postAddBlogReport = async (req: RequestWithUser) => {
    const { user } = req;
    const blogId = req.params.id;
    const { message } = req.body;
    return await caseAddNewFlag(flagsRepository, createError, user, blogId, message);
  };

  return {
    postUserNewBlog,
    getUserBlogUploadUrl,
    putUserUpdateBlog,
    getUserBlogData,
    getUserBlogDataForEdit,
    putUserPublishBlog,
    putUserComment,
    getUserBlogComments,
    deleteUserBlogComment,
    getAllBlogsDisplay,
    putUserUnpublishBlog,
    deleteUserBlog,
    getDeletedBlogs,
    putRecoverDeletedBlog,
    getAllBlogsForHome,
    putUserLikeBlog,
    deleteLikeBlog,
    putUserDislikeBlog,
    deleteUserDislikeBlog,
    getBlogReactionStatus,
    postAddBlogReport,
  };
};

export default userController;
