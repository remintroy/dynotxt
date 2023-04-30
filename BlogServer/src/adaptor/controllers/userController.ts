import addNewBlog from "../../application/use-cases/add-blog";
import createUploadUrl from "../../application/use-cases/create-upload-url";
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

  return {
    postUserNewBlog,
    getUserBlogUploadUrl,
    putUserUpdateBlog,
  };
};

export default userController;
