import addNewBlog from "../../application/use-cases/add-blog";
import { RequestWithUser } from "../../frameworks/webserver/express";

const userController = (blogRepository, createError) => {
  // create new blog which is currently a draft
  const postUserNewBlog = async (req: RequestWithUser) => {
    const userId = req.user;
    const blogData = req.body;
    const response = await addNewBlog(
      blogRepository,
      createError,
      blogData,
      userId
    );
    return response;
  };

  return {
    postUserNewBlog,
  };
};

export default userController;
