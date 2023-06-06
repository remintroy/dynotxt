import caseUserBlogCreateBannerUploadUrl from "../../application/use-cases/blog/user-create-upload-url";
import caseUserBlogsGetInPages from "../../application/use-cases/blog/user-get-blogs-pages";
import caseUserBlogGetDataToEdit from "../../application/use-cases/blog/user-get-blog-to-edit";
import caseUserBlogGet from "../../application/use-cases/blog/user-get-blog";
import caseUserBlogAddNew from "../../application/use-cases/blog/user-blog-add-new";
import caseUserBlogUpdate from "../../application/use-cases/blog/user-blog-update";
import caseUserBlogsGetForHomeFeed from "../../application/use-cases/blog/user-get-blogs-home-feed";
import caseUserBlogGetTrashed from "../../application/use-cases/blog/user-get-blogs-deleted";
import caseUserBlogMakePublic from "../../application/use-cases/blog/user-blog-make-public";
import caseUserBlogMakePrivate from "../../application/use-cases/blog/user-blog-make-private";
import caseUserBlogMoveToTrash from "../../application/use-cases/blog/user-trash-blog";
import caseUserBlogRecoverFromTrash from "../../application/use-cases/blog/user-trash-recover-blog";
import caseUserCommentAddNew from "../../application/use-cases/comments/user-comment-add";
import caseUserCommentDelete from "../../application/use-cases/comments/user-comment-delete";
import caseUserCommentsGet from "../../application/use-cases/comments/user-comments-get";
import caseUserFlagsAdd from "../../application/use-cases/flags/user-flags-add";
import caseUserReactionDislike from "../../application/use-cases/reactions/user-reaction-dislike";
import caseUserReactionLike from "../../application/use-cases/reactions/user-reaction-like";
import caseUserReactionLikeRemove from "../../application/use-cases/reactions/user-reaction-like-remove";
import caseUserReactionDislikeRemove from "../../application/use-cases/reactions/user-reaction-dilsike-remove";
import caseUserReactionLikeGetStatus from "../../application/use-cases/reactions/user-reaction-get-like-status";
import blogRepositoryInteraface from "../repositorys/blogRepositoryInteraface";
import commentRepositoryInterface from "../repositorys/commentRepositoryInterface";
import flagsRepositoryInterface from "../repositorys/flagsRepositoryInterface";
import reactionRepositoryInterface from "../repositorys/reactionRepositoryInterface";
import blogServiceInterface from "../service";
import { RequestWithUser } from "../../frameworks/webserver/express";
import GetUtils from "dynotxt-common-services/build/utils";
import caseUserBlogSoftDeleteFromTrash from "../../application/use-cases/blog/user-trash-soft-delete";
import caseUserViewsAddNew from "../../application/use-cases/views/user-views-add-view";
import viewsRepositoryInterface from "../repositorys/viewsRepositoryInterface";
import caseUserViewsGetByBlogId from "../../application/use-cases/views/user-views-blog-get-views";
import caseUserVIewsGetByUserId from "../../application/use-cases/views/user-views-get-all-by-userId";
import caseUserBlogsSearch from "../../application/use-cases/blog/user-get-blogs-search";
import rabbitMqConnection from "../../frameworks/rabbitmq";
import caseUserSearchBlogCategoryList from "../../application/use-cases/blog/user-search-blog-categorys";

const userController = (
  blogRepository: blogRepositoryInteraface,
  blogService: blogServiceInterface,
  reactionRepository: reactionRepositoryInterface,
  flagsRepository: flagsRepositoryInterface,
  commentRepository: commentRepositoryInterface,
  viewsRepository: viewsRepositoryInterface,
  utilsService: GetUtils,
  rabbitmq: rabbitMqConnection
) => {
  // create new blog which is currently a draft
  const postUserNewBlog = async (req: RequestWithUser) => {
    const userId = req.user;
    const blogData = req.body;
    const response = await caseUserBlogAddNew(blogRepository, blogService, utilsService, blogData, userId);
    return response;
  };

  const getUserBlogUploadUrl = async (req: RequestWithUser) => {
    const blogId = req.params.id;
    const author = req.user;
    return await caseUserBlogCreateBannerUploadUrl(blogRepository, blogService, utilsService, blogId, author);
  };

  const putUserUpdateBlog = async (req: RequestWithUser) => {
    const blogId = req.params.id;
    const author = req.user;
    const blogData = req.body;
    return await caseUserBlogUpdate(blogRepository, utilsService, blogId, author, blogData);
  };

  const getUserBlogData = async (req: RequestWithUser) => {
    const { user } = req;
    const blogId = req.params.id;
    return await caseUserBlogGet(blogRepository, utilsService, blogId, user);
  };

  const getUserBlogDataForEdit = async (req: RequestWithUser) => {
    const { user } = req;
    const blogId = req.params.id;
    return await caseUserBlogGetDataToEdit(blogRepository, utilsService, blogId, user);
  };

  const putUserPublishBlog = async (req: RequestWithUser) => {
    const { user } = req;
    const blogId = req.params.id;
    return await caseUserBlogMakePublic(blogRepository, utilsService, blogId, user);
  };

  const putUserUnpublishBlog = async (req: RequestWithUser) => {
    const { user } = req;
    const blogId = req.params.id;
    return await caseUserBlogMakePrivate(blogRepository, utilsService, blogId, user);
  };

  const getAllBlogsDisplay = async (req: RequestWithUser) => {
    const { user } = req;
    const userId = req.params.id;
    const page = req.query.page ? Number(req.query.page) : 1;
    return await caseUserBlogsGetInPages(blogRepository, utilsService, user, userId, page);
  };

  const getDeletedBlogs = async (req: RequestWithUser) => {
    const { user } = req;
    const page = req.query.page ? Number(req.query.page) : 1;
    return await caseUserBlogGetTrashed(blogRepository, utilsService, user, page);
  };

  const deleteUserBlog = async (req: RequestWithUser) => {
    const { user } = req;
    const blogId = req.params.id;
    return await caseUserBlogMoveToTrash(blogRepository, utilsService, user, blogId);
  };

  const getAllBlogsForHome = async (req: RequestWithUser) => {
    const page = Number(req.query.page) || 1;
    return await caseUserBlogsGetForHomeFeed(blogRepository, utilsService, page);
  };

  const putRecoverDeletedBlog = async (req: RequestWithUser) => {
    const { user } = req;
    const blogId = req.params.id;
    return await caseUserBlogRecoverFromTrash(blogRepository, utilsService, user, blogId);
  };

  const deleteBlogPermenetly = async (req: RequestWithUser) => {
    const { user } = req;
    const blogId = req.params.id;
    return await caseUserBlogSoftDeleteFromTrash(blogRepository, utilsService, blogId, user);
  };

  const putUserComment = async (req: RequestWithUser) => {
    const { user } = req;
    const blogId = req.params.id;
    const commentData = req.body;
    return await caseUserCommentAddNew(commentRepository, blogRepository, utilsService, blogId, user, commentData);
  };

  const getUserBlogComments = async (req: RequestWithUser) => {
    const { user } = req;
    const blogId = req.params.id;
    return await caseUserCommentsGet(commentRepository, blogRepository, utilsService, blogId, user);
  };

  const deleteUserBlogComment = async (req: RequestWithUser) => {
    const { user } = req;
    const blogId = req.params.id;
    const commentId = req.params.cid;
    return await caseUserCommentDelete(commentRepository, blogRepository, utilsService, blogId, user, commentId);
  };

  const postAddBlogReport = async (req: RequestWithUser) => {
    const { user } = req;
    const blogId = req.params.id;
    const { message } = req.body;
    return await caseUserFlagsAdd(flagsRepository, utilsService, user, blogId, message);
  };

  const getBlogSearchByQuery = async (req: RequestWithUser) => {
    const searchQuery = req.query?.query;
    const page = Number(req.query?.page) || 1;
    return await caseUserBlogsSearch(blogRepository, utilsService, searchQuery as string, page);
  };

  const putUserLikeBlog = async (req: RequestWithUser) => {
    const { user } = req;
    const blogId = req.params.id;
    return await caseUserReactionLike(reactionRepository, utilsService, user, blogId);
  };

  const deleteLikeBlog = async (req: RequestWithUser) => {
    const { user } = req;
    const blogId = req.params.id;
    return await caseUserReactionLikeRemove(reactionRepository, utilsService, user, blogId);
  };

  const putUserDislikeBlog = async (req: RequestWithUser) => {
    const { user } = req;
    const blogId = req.params.id;
    return await caseUserReactionDislike(reactionRepository, utilsService, user, blogId);
  };

  const deleteUserDislikeBlog = async (req: RequestWithUser) => {
    const { user } = req;
    const blogId = req.params.id;
    return await caseUserReactionDislikeRemove(reactionRepository, utilsService, user, blogId);
  };

  const getBlogReactionStatus = async (req: RequestWithUser) => {
    const { user } = req;
    const blogId = req.params.id;
    return await caseUserReactionLikeGetStatus(reactionRepository, utilsService, user, blogId);
  };

  const postViewsAddNew = async (req: RequestWithUser) => {
    const blogId = req.params.id;
    return await caseUserViewsAddNew(viewsRepository, blogRepository, utilsService, blogId);
  };

  const getViewsByBlogId = async (req: RequestWithUser) => {
    const blogId = req.params.id;
    return await caseUserViewsGetByBlogId(viewsRepository, utilsService, blogId);
  };

  const getViewsByUserId = async (req: RequestWithUser) => {
    const { user } = req;
    const nDaysAgo = 10;
    return await caseUserVIewsGetByUserId(viewsRepository, utilsService, user, nDaysAgo);
  };

  const getBlogCategorysWithSearchQuery = async (req: RequestWithUser) => {
    const searchQuery = req.query.query;
    return await caseUserSearchBlogCategoryList(blogRepository, utilsService, searchQuery as string);
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
    getBlogSearchByQuery,
    deleteUserBlogComment,
    getAllBlogsDisplay,
    putUserUnpublishBlog,
    deleteUserBlog,
    deleteBlogPermenetly,
    getDeletedBlogs,
    putRecoverDeletedBlog,
    getAllBlogsForHome,
    putUserLikeBlog,
    deleteLikeBlog,
    putUserDislikeBlog,
    deleteUserDislikeBlog,
    getBlogReactionStatus,
    postAddBlogReport,
    postViewsAddNew,
    getViewsByBlogId,
    getViewsByUserId,
    getBlogCategorysWithSearchQuery,
  };
};

export default userController;
