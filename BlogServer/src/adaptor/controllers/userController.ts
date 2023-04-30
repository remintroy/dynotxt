import addNewBlog from "../../application/use-cases/add-blog";
import createUploadUrl from "../../application/use-cases/create-upload-url";
import getBlogData from "../../application/use-cases/get-blog";
import updateBlog from "../../application/use-cases/update-blog";
import { RequestWithUser } from "../../frameworks/webserver/express";
import blogRepositoryInteraface from "../repositorys/blogRepositoryInteraface";
import blogServiceInterface from "../service";

const userController = (
  blogRepository: ReturnType<typeof blogRepositoryInteraface>,
  blogService: ReturnType<typeof blogServiceInterface>,
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

  return {
    postUserNewBlog,
    getUserBlogUploadUrl,
    putUserUpdateBlog,
    getUserBlogData,
  };
};

export default userController;
