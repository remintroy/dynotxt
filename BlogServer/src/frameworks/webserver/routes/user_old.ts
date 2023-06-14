import ExpressApp from "express";
import blogRepositoryInteraface from "../../../adaptor/repositorys/blogRepositoryInteraface";
import blogRepositoryImpl from "../../mongoDb/repository/blogRepositoryImpl";
import userController from "../../../adaptor/controllers/userController_old";
import blogServiceInterface from "../../../adaptor/service";
import blogServiceImpl from "../../services";
import commentRepositoryInterface from "../../../adaptor/repositorys/commentRepositoryInterface";
import commentRepositoryImpl from "../../mongoDb/repository/commentsRepositoryImpl";
import reactionRepositoryInterface from "../../../adaptor/repositorys/reactionRepositoryInterface";
import reactionRepositoryImpl from "../../mongoDb/repository/reactionsRepositoryImpl";
import flagsRepositoryInterface from "../../../adaptor/repositorys/flagsRepositoryInterface";
import flagsRepositoryImpl from "../../mongoDb/repository/flagsReporitoryImpl";
import GetUtils from "dynotxt-common-services/build/utils";
import GetJwt from "dynotxt-common-services/build/jwt";
import getConfigs from "../../../configs";
import GetExpress from "dynotxt-common-services/build/express";
import viewsRepositoryInterface from "../../../adaptor/repositorys/viewsRepositoryInterface";
import viewsRepositoryImpl from "../../mongoDb/repository/viewsRepositoryImpl";
import rabbitMqConnection from "../../rabbitmq";

export default function userRouter(express: typeof ExpressApp) {
  const router = express.Router();
  const config = getConfigs();

  const expressService = new GetExpress();
  const utilsService = new GetUtils();
  const jwtService = new GetJwt({
    accessTokenSecret: config.jwt.user,
  });

  const blogRepository = blogRepositoryInteraface(blogRepositoryImpl());
  const blogService = blogServiceInterface(blogServiceImpl());
  const reactionRepository = reactionRepositoryInterface(reactionRepositoryImpl());
  const commentRepository = commentRepositoryInterface(commentRepositoryImpl());
  const flagsRepository = flagsRepositoryInterface(flagsRepositoryImpl());
  const viewsRepository = viewsRepositoryInterface(viewsRepositoryImpl());

  const rabbitmq = rabbitMqConnection();

  const controller = userController(
    blogRepository,
    blogService,
    reactionRepository,
    flagsRepository,
    commentRepository,
    viewsRepository,
    utilsService,
    rabbitmq
  );

  router.use(expressService.createAuthInit({ userJwt: jwtService }));

  router
    .route("/blog")
    .post(expressService.mustLoginAsUser, expressService.makeExpressCallback(controller.postUserNewBlog));
  router
    .route("/blog/:id")
    .get(expressService.makeExpressCallback(controller.getUserBlogData))
    .put(expressService.mustLoginAsUser, expressService.makeExpressCallback(controller.putUserUpdateBlog))
    .delete(expressService.mustLoginAsUser, expressService.makeExpressCallback(controller.deleteUserBlog));
  router
    .route("/blog/:id/permenent")
    .delete(expressService.mustLoginAsUser, expressService.makeExpressCallback(controller.deleteBlogPermenetly));
  router
    .route("/blog/:id/edit")
    .get(expressService.mustLoginAsUser, expressService.makeExpressCallback(controller.getUserBlogDataForEdit));
  router
    .route("/blog/:id/publish")
    .put(expressService.mustLoginAsUser, expressService.makeExpressCallback(controller.putUserPublishBlog));
  router
    .route("/blog/:id/unpublish")
    .put(expressService.mustLoginAsUser, expressService.makeExpressCallback(controller.putUserUnpublishBlog));
  router
    .route("/upload/:id")
    .get(expressService.mustLoginAsUser, expressService.makeExpressCallback(controller.getUserBlogUploadUrl));
  router
    .route("/comment/:id")
    .get(expressService.makeExpressCallback(controller.getUserBlogComments))
    .put(expressService.mustLoginAsUser, expressService.makeExpressCallback(controller.putUserComment));
  router
    .route("/comment/:id/:cid")
    .delete(expressService.mustLoginAsUser, expressService.makeExpressCallback(controller.deleteUserBlogComment));
  router.route("/user/:id").get(expressService.makeExpressCallback(controller.getAllBlogsDisplay));
  router
    .route("/trash")
    .get(expressService.mustLoginAsUser, expressService.makeExpressCallback(controller.getDeletedBlogs));
  router
    .route("/trash/:id")
    .put(expressService.mustLoginAsUser, expressService.makeExpressCallback(controller.putRecoverDeletedBlog));
  router.route("/public/all").get(expressService.makeExpressCallback(controller.getAllBlogsForHome));
  router
    .route("/like/:id")
    .post(expressService.mustLoginAsUser, expressService.makeExpressCallback(controller.putUserLikeBlog))
    .delete(expressService.mustLoginAsUser, expressService.makeExpressCallback(controller.deleteLikeBlog))
    .get(expressService.makeExpressCallback(controller.getBlogReactionStatus));
  router
    .route("/dislike/:id")
    .post(expressService.mustLoginAsUser, expressService.makeExpressCallback(controller.putUserDislikeBlog))
    .delete(expressService.mustLoginAsUser, expressService.makeExpressCallback(controller.deleteUserDislikeBlog));
  router.route("/report/:id").post(expressService.makeExpressCallback(controller.postAddBlogReport));
  router
    .route("/analytics/views/blog/:id")
    .get(expressService.makeExpressCallback(controller.getViewsByBlogIdAnalytics));
  router
    .route("/analytics/view/:id")
    .get(expressService.makeExpressCallback(controller.getViewsByBlogId))
    .post(expressService.makeExpressCallback(controller.postViewsAddNew));
  router
    .route("/analytics/view/")
    .get(expressService.mustLoginAsUser, expressService.makeExpressCallback(controller.getViewsByUserId));
  router.route("/search").get(expressService.makeExpressCallback(controller.getBlogSearchByQuery));
  router.route("/search/category").get(expressService.makeExpressCallback(controller.getBlogCategorysWithSearchQuery));
  router.route("/category/blogs/").post(expressService.makeExpressCallback(controller.getBlogsFromCategoryList));

  return router;
}
