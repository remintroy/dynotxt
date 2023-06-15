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
import caseUserSearchBlogCategoryList from "../../application/use-cases/blog/user-blog-category-search";
import caseUserBlogGetFromCategoryList from "../../application/use-cases/blog/user-get-blogs-from-category-list";
import caseUserVIewsGetByBlogId from "../../application/use-cases/views/user-views-get-all-by-blogId";

const createUserController = (
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
  const blogCreateNew = async (req: RequestWithUser) => {
    const userId = req.user;
    const blogData = req.body;
    const response = await caseUserBlogAddNew(blogRepository, blogService, utilsService, blogData, userId);
    return response;
  };

  const getUserBlogUploadUrl = async (req: RequestWithUser) => {
    const blogId = req.params.blogId;
    const author = req.user;
    return await caseUserBlogCreateBannerUploadUrl(blogRepository, blogService, utilsService, blogId, author);
  };

  const blogUpdateData = async (req: RequestWithUser) => {
    const blogId = req.params.blogId;
    const author = req.user;
    const blogData = req.body;
    return await caseUserBlogUpdate(blogRepository, utilsService, blogId, author, blogData);
  };

  const blogGetById = async (req: RequestWithUser) => {
    const { user } = req;
    const blogId = req.params.blogId;
    return await caseUserBlogGet(blogRepository, utilsService, blogId, user);
  };

  const getUserBlogDataForEdit = async (req: RequestWithUser) => {
    const { user } = req;
    const blogId = req.params.blogId;
    return await caseUserBlogGetDataToEdit(blogRepository, utilsService, blogId, user);
  };

  const putUserPublishBlog = async (req: RequestWithUser) => {
    const { user } = req;
    const blogId = req.params.blogId;
    return await caseUserBlogMakePublic(blogRepository, utilsService, blogId, user);
  };

  const putUserUnpublishBlog = async (req: RequestWithUser) => {
    const { user } = req;
    const blogId = req.params.blogId;
    return await caseUserBlogMakePrivate(blogRepository, utilsService, blogId, user);
  };

  const userGetAllBlogs = async (req: RequestWithUser) => {
    const { user } = req;
    const userId = req.params.userId;
    const page = req.query.page ? Number(req.query.page) : 1;
    const sortQuery: any = req.query?.sort;
    const sort = { key: sortQuery?.split("_")?.[0], order: sortQuery?.split("_")?.[1] };
    return await caseUserBlogsGetInPages(blogRepository, utilsService, user, userId, { page, sort });
  };

  const trashGetByUser = async (req: RequestWithUser) => {
    const { user } = req;
    const page = req.query.page ? Number(req.query.page) : 1;
    return await caseUserBlogGetTrashed(blogRepository, utilsService, user, page);
  };

  const blogDelete = async (req: RequestWithUser) => {
    const { user } = req;
    const blogId = req.params.blogId;
    return await caseUserBlogMoveToTrash(blogRepository, utilsService, user, blogId);
  };

  const blogGetAllWithQuery = async (req: RequestWithUser) => {
    const page = Number(req.query.page) || 1;
    const querys = req.query;
    return await caseUserBlogsGetForHomeFeed(blogRepository, utilsService, querys, page);
  };

  const trashRecoverById = async (req: RequestWithUser) => {
    const { user } = req;
    const blogId = req.params.blogId;
    return await caseUserBlogRecoverFromTrash(blogRepository, utilsService, user, blogId);
  };

  const trashDeleteById = async (req: RequestWithUser) => {
    const { user } = req;
    const blogId = req.params.blogId;
    return await caseUserBlogSoftDeleteFromTrash(blogRepository, utilsService, blogId, user);
  };

  const commentsPostWithBlogId = async (req: RequestWithUser) => {
    const { user } = req;
    const blogId = req.params.blogId;
    const commentData = req.body;
    return await caseUserCommentAddNew(commentRepository, blogRepository, utilsService, blogId, user, commentData);
  };

  const commentsGetWithBlogId = async (req: RequestWithUser) => {
    const { user } = req;
    const blogId = req.params.blogId;
    return await caseUserCommentsGet(commentRepository, blogRepository, utilsService, blogId, user);
  };

  const commentsDelete = async (req: RequestWithUser) => {
    const { user } = req;
    const blogId = req.params.blogId;
    const commentId = req.params.cid;
    return await caseUserCommentDelete(commentRepository, blogRepository, utilsService, blogId, user, commentId);
  };

  const blogPostRepost = async (req: RequestWithUser) => {
    const { user } = req;
    const blogId = req.params.blogId;
    const { message } = req.body;
    return await caseUserFlagsAdd(flagsRepository, utilsService, user, blogId, message);
  };

  const searchGetBlogsByQuery = async (req: RequestWithUser) => {
    const searchQuery = req.query?.query;
    const page = Number(req.query?.page) || 1;
    return await caseUserBlogsSearch(blogRepository, utilsService, searchQuery as string, page);
  };

  const reactionsPostLike = async (req: RequestWithUser) => {
    const { user } = req;
    const blogId = req.params.blogId;
    return await caseUserReactionLike(reactionRepository, utilsService, user, blogId);
  };

  const reactionsDeleteLike = async (req: RequestWithUser) => {
    const { user } = req;
    const blogId = req.params.blogId;
    return await caseUserReactionLikeRemove(reactionRepository, utilsService, user, blogId);
  };

  const reactionsPostDislike = async (req: RequestWithUser) => {
    const { user } = req;
    const blogId = req.params.blogId;
    return await caseUserReactionDislike(reactionRepository, utilsService, user, blogId);
  };

  const reactionsDeleteDislike = async (req: RequestWithUser) => {
    const { user } = req;
    const blogId = req.params.blogId;
    return await caseUserReactionDislikeRemove(reactionRepository, utilsService, user, blogId);
  };

  const reactionsGetByBlogId = async (req: RequestWithUser) => {
    const { user } = req;
    const blogId = req.params.blogId;
    return await caseUserReactionLikeGetStatus(reactionRepository, utilsService, user, blogId);
  };

  const viewsAddNewByBlogId = async (req: RequestWithUser) => {
    const blogId = req.params.blogId;
    return await caseUserViewsAddNew(viewsRepository, blogRepository, utilsService, blogId);
  };

  const viewsGetByBlogId = async (req: RequestWithUser) => {
    const blogId = req.params.blogId;
    return await caseUserViewsGetByBlogId(viewsRepository, utilsService, blogId);
  };

  const analyticsGetAllViewsByUser = async (req: RequestWithUser) => {
    const { user } = req;
    const daysAgo = Number(req.query.daysAgo) || 10;
    return await caseUserVIewsGetByUserId(viewsRepository, utilsService, user, daysAgo);
  };

  const analyticsGetViewsByBlogId = async (req: RequestWithUser) => {
    const { user } = req;
    const blogId = req.params.blogId;
    const daysAgo = Number(req.query.daysAgo) || 10;
    return await caseUserVIewsGetByBlogId(viewsRepository, utilsService, user, blogId, daysAgo);
  };

  const searchGetCategorysWithQuery = async (req: RequestWithUser) => {
    const searchQuery = req.query.query;
    const page = Number(req.query.page) || 1;
    return await caseUserSearchBlogCategoryList(blogRepository, utilsService, searchQuery as string, page);
  };

  const getBlogsFromCategoryList = async (req: RequestWithUser) => {
    const categoryList = req.body;
    const page = Number(req.query.page) || 1;
    return await caseUserBlogGetFromCategoryList(blogRepository, utilsService, categoryList, { page });
  };

  return {
    blogCreateNew,
    blogUpdateData,
    blogGetById,
    blogDelete,
    blogPostRepost,
    blogGetAllWithQuery,
    commentsPostWithBlogId,
    commentsGetWithBlogId,
    commentsDelete,
    trashGetByUser,
    trashRecoverById,
    trashDeleteById,
    reactionsGetByBlogId,
    reactionsPostLike,
    reactionsDeleteLike,
    reactionsPostDislike,
    reactionsDeleteDislike,
    analyticsGetViewsByBlogId,
    analyticsGetAllViewsByUser,
    viewsAddNewByBlogId,
    viewsGetByBlogId,
    searchGetBlogsByQuery,
    searchGetCategorysWithQuery,
    userGetAllBlogs,
    // ! --
    // controllers below is staged for removal
    putUserPublishBlog,
    putUserUnpublishBlog,
    getUserBlogUploadUrl,
    getUserBlogDataForEdit,
    getBlogsFromCategoryList,
  };
};

export default createUserController;
