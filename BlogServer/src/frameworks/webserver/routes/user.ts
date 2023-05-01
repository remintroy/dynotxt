import ExpressApp from "express";
import blogRepositoryInteraface from "../../../adaptor/repositorys/blogRepositoryInteraface";
import blogRepositoryImpl from "../../mongoDb/repository/blogRepositoryImpl";
// eslint-disable-next-line import/order
import GetUtils from "dynotxt-common-services/utils";
import userController from "../../../adaptor/controllers/userController";
import makeExpressResponseCallback from "../callbacks/createExpressCallback";
import mustLoginAsUser from "../middleware/mustLoginAsUser";
import blogServiceInterface from "../../../adaptor/service";
import blogServiceImpl from "../../services";
import commentRepositoryInterface from "../../../adaptor/repositorys/commentRepositoryInterface";
import commentRepositoryImpl from "../../mongoDb/repository/commentsRepositoryImpl";

export default function userRouter(express: typeof ExpressApp) {
  const router = express.Router();

  const blogRepository = blogRepositoryInteraface(blogRepositoryImpl());
  const blogService = blogServiceInterface(blogServiceImpl());
  const commentRepository = commentRepositoryInterface(commentRepositoryImpl());
  const utils = new GetUtils();

  const controller = userController(
    blogRepository,
    blogService,
    commentRepository,
    utils.createError
  );

  router
    .route("/blog")
    .post(
      mustLoginAsUser,
      makeExpressResponseCallback(controller.postUserNewBlog)
    );

  router
    .route("/blog/:id")
    .put(
      mustLoginAsUser,
      makeExpressResponseCallback(controller.putUserUpdateBlog)
    )
    .get(makeExpressResponseCallback(controller.getUserBlogData));

  router
    .route("/blog/:id/edit")
    .get(makeExpressResponseCallback(controller.getUserBlogDataForEdit));

  router
    .route("/blog/:id/publish")
    .put(makeExpressResponseCallback(controller.putUserPublishBlog));

  router
    .route("/upload/:id")
    .get(
      mustLoginAsUser,
      makeExpressResponseCallback(controller.getUserBlogUploadUrl)
    );

  router
    .route("/comment/:id")
    .get(makeExpressResponseCallback(controller.getUserBlogComments))
    .put(
      mustLoginAsUser,
      makeExpressResponseCallback(controller.putUserComment)
    );

  router
    .route("/comment/:id/:cid")
    .delete(
      mustLoginAsUser,
      makeExpressResponseCallback(controller.deleteUserBlogComment)
    );

  return router;
}
