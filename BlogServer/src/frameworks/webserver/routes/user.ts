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
import reactionRepositoryInterface from "../../../adaptor/repositorys/reactionRepositoryInterface";
import reactionRepositoryImpl from "../../mongoDb/repository/reactionsRepositoryImpl";
import flagsRepositoryInterface from "../../../adaptor/repositorys/flagsRepositoryInterface";
import flagsRepositoryImpl from "../../mongoDb/repository/flagsReporitoryImpl";

export default function userRouter(express: typeof ExpressApp) {
  const router = express.Router();

  const utils = new GetUtils();
  const blogRepository = blogRepositoryInteraface(blogRepositoryImpl());
  const blogService = blogServiceInterface(blogServiceImpl());
  const reactionRepository = reactionRepositoryInterface(reactionRepositoryImpl());
  const commentRepository = commentRepositoryInterface(commentRepositoryImpl());
  const flagsRepository = flagsRepositoryInterface(flagsRepositoryImpl());
  const controller = userController(
    blogRepository,
    blogService,
    reactionRepository,
    flagsRepository,
    commentRepository,
    utils.createError
  );

  router.route("/blog").post(mustLoginAsUser, makeExpressResponseCallback(controller.postUserNewBlog));
  router
    .route("/blog/:id")
    .get(makeExpressResponseCallback(controller.getUserBlogData))
    .put(mustLoginAsUser, makeExpressResponseCallback(controller.putUserUpdateBlog))
    .delete(mustLoginAsUser, makeExpressResponseCallback(controller.deleteUserBlog));
  router.route("/blog/:id/edit").get(mustLoginAsUser, makeExpressResponseCallback(controller.getUserBlogDataForEdit));
  router.route("/blog/:id/publish").put(mustLoginAsUser, makeExpressResponseCallback(controller.putUserPublishBlog));
  router
    .route("/blog/:id/unpublish")
    .put(mustLoginAsUser, makeExpressResponseCallback(controller.putUserUnpublishBlog));
  router.route("/upload/:id").get(mustLoginAsUser, makeExpressResponseCallback(controller.getUserBlogUploadUrl));
  router
    .route("/comment/:id")
    .get(makeExpressResponseCallback(controller.getUserBlogComments))
    .put(mustLoginAsUser, makeExpressResponseCallback(controller.putUserComment));
  router
    .route("/comment/:id/:cid")
    .delete(mustLoginAsUser, makeExpressResponseCallback(controller.deleteUserBlogComment));
  router.route("/user/:id").get(makeExpressResponseCallback(controller.getAllBlogsDisplay));
  router.route("/trash").get(mustLoginAsUser, makeExpressResponseCallback(controller.getDeletedBlogs));
  router.route("/trash/:id").put(mustLoginAsUser, makeExpressResponseCallback(controller.putRecoverDeletedBlog));
  router.route("/public/all").get(makeExpressResponseCallback(controller.getAllBlogsForHome));
  router
    .route("/like/:id")
    .post(mustLoginAsUser, makeExpressResponseCallback(controller.putUserLikeBlog))
    .delete(mustLoginAsUser, makeExpressResponseCallback(controller.deleteLikeBlog))
    .get(makeExpressResponseCallback(controller.getBlogReactionStatus));
  router
    .route("/dislike/:id")
    .post(mustLoginAsUser, makeExpressResponseCallback(controller.putUserDislikeBlog))
    .delete(mustLoginAsUser, makeExpressResponseCallback(controller.deleteUserDislikeBlog));

  router.route("/report/:id").post(makeExpressResponseCallback(controller.postAddBlogReport));
  return router;
}
