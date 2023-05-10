import addNewBlog from "../../application/use-cases/blog/add-blog";
import createUploadUrl from "../../application/use-cases/blog/create-upload-url";
import caseDeleteBlog from "../../application/use-cases/blog/delete-blog";
import caseGetAllBlogs from "../../application/use-cases/blog/get-all-blogs";
import getBlogData from "../../application/use-cases/blog/get-blog";
import getBlogDataToEdit from "../../application/use-cases/blog/get-blog-edit";
import publishBlog from "../../application/use-cases/blog/publish-blog";
import unPublishBlog from "../../application/use-cases/blog/unpublish-blog";
import updateBlog from "../../application/use-cases/blog/update-blog";
import addComment from "../../application/use-cases/comments/add-comment";
import deleteComment from "../../application/use-cases/comments/delele-comment";
import getComments from "../../application/use-cases/comments/get-comments";
import { RequestWithUser } from "../../frameworks/webserver/express";
import blogRepositoryInteraface from "../repositorys/blogRepositoryInteraface";
import commentRepositoryInterface from "../repositorys/commentRepositoryInterface";
import blogServiceInterface from "../service";

const userController = (
  blogRepository: ReturnType<typeof blogRepositoryInteraface>,
  blogService: ReturnType<typeof blogServiceInterface>,
  commentRepository: ReturnType<typeof commentRepositoryInterface>,
  createError
) => {
  // create new blog which is currently a draft
  const postUserNewBlog = async (req: RequestWithUser) => {
    const userId = req.user;
    const blogData = req.body;
    const response = await addNewBlog(
      blogRepository,
      blogService,
      createError,
      blogData,
      userId
    );
    return response;
  };

  const getUserBlogUploadUrl = async (req: RequestWithUser) => {
    const blogId = req.params.id;
    const author = req.user;
    const response = await createUploadUrl(
      blogRepository,
      blogService,
      createError,
      blogId,
      author
    );
    return response;
  };

  const putUserUpdateBlog = async (req: RequestWithUser) => {
    const blogId = req.params.id;
    const author = req.user;
    const blogData = req.body;
    const response = await updateBlog(
      blogRepository,
      createError,
      blogId,
      author,
      blogData
    );
    return response;
  };

  const getUserBlogData = async (req: RequestWithUser) => {
    const { user } = req;
    const blogId = req.params.id;
    const response = await getBlogData(
      blogRepository,
      createError,
      blogId,
      user
    );
    return response;
  };

  const getUserBlogDataForEdit = async (req: RequestWithUser) => {
    const { user } = req;
    const blogId = req.params.id;
    const response = await getBlogDataToEdit(
      blogRepository,
      createError,
      blogId,
      user
    );
    return response;
  };

  const putUserPublishBlog = async (req: RequestWithUser) => {
    const { user } = req;
    const blogId = req.params.id;
    const response = await publishBlog(
      blogRepository,
      createError,
      blogId,
      user
    );
    return response;
  };

  const putUserComment = async (req: RequestWithUser) => {
    const { user } = req;
    const blogId = req.params.id;
    const commentData = req.body;
    const response = await addComment(
      commentRepository,
      blogRepository,
      createError,
      blogId,
      user,
      commentData
    );
    return response;
  };

  const getUserBlogComments = async (req: RequestWithUser) => {
    const { user } = req;
    const blogId = req.params.id;
    const response = await getComments(
      commentRepository,
      blogRepository,
      createError,
      blogId,
      user
    );
    return response;
  };

  const deleteUserBlogComment = async (req: RequestWithUser) => {
    const { user } = req;
    const blogId = req.params.id;
    const commentId = req.params.cid;
    const response = await deleteComment(
      commentRepository,
      blogRepository,
      createError,
      blogId,
      user,
      commentId
    );
    return response;
  };

  const getAllBlogsDisplay = async (req: RequestWithUser) => {
    const { user } = req;
    const userId = req.params.id;
    const response = await caseGetAllBlogs(
      blogRepository,
      createError,
      user,
      userId
    );
    return response;
  };

  const putUserUnpublishBlog = async (req: RequestWithUser) => {
    const { user } = req;
    const blogId = req.params.id;
    const response = await unPublishBlog(
      blogRepository,
      createError,
      blogId,
      user
    );
    return response;
  };

  const deleteUserBlog = async (req: RequestWithUser) => {
    const { user } = req;
    const blogId = req.params.id;
    const response = await caseDeleteBlog(
      blogRepository,
      createError,
      user,
      blogId
    );
    return response;
  };

  const putUserLikeBlog = async (req: RequestWithUser) => {};

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
    putUserLikeBlog,
    getAllBlogsDisplay,
    putUserUnpublishBlog,
    deleteUserBlog,
  };
};

export default userController;
