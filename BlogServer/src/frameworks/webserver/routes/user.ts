import ExpressApp from "express";
import blogRepositoryInteraface from "../../../adaptor/repositorys/blogRepositoryInteraface";
import blogRepositoryImpl from "../../mongoDb/repository/blogRepositoryImpl";
import createUserController from "../../../adaptor/controllers/userController";
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

  const { makeExpressCallback, createAuthInit, mustLoginAsUser } = new GetExpress();
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

  const controller = createUserController(
    blogRepository,
    blogService,
    reactionRepository,
    flagsRepository,
    commentRepository,
    viewsRepository,
    utilsService,
    rabbitmq
  );

  const {
    blogGetById,
    blogCreateNew,
    blogUpdateData,
    blogDelete,
    blogPostRepost,
    blogGetAllWithQuery,
    commentsGetWithBlogId,
    commentsPostWithBlogId,
    commentsDelete,
    trashGetByUser,
    trashRecoverById,
    trashDeleteById,
    reactionsGetByBlogId,
    reactionsPostLike,
    reactionsPostDislike,
    reactionsDeleteLike,
    reactionsDeleteDislike,
    analyticsGetViewsByBlogId,
    analyticsGetAllViewsByUser,
    viewsGetByBlogId,
    viewsAddNewByBlogId,
    searchGetBlogsByQuery,
    searchGetCategorysWithQuery,
    userGetAllBlogs,
  } = controller;

  router.use(createAuthInit({ userJwt: jwtService }));

  const blogRouter = express.Router();
  const viewsRouter = express.Router();
  const commentsRouter = express.Router();
  const reactionsRouter = express.Router();
  const searchRouter = express.Router();
  const analyticsRouter = express.Router();
  const trashRouter = express.Router();
  const usersRouter = express.Router();

  /** BLOG - routes */
  blogRouter.get("/", makeExpressCallback(blogGetAllWithQuery));
  blogRouter.get("/:blogId", makeExpressCallback(blogGetById));
  blogRouter.delete("/:blogId", makeExpressCallback(blogDelete));
  // routes require login
  blogRouter.use(mustLoginAsUser);
  blogRouter.put("/:blogId", makeExpressCallback(blogUpdateData));
  blogRouter.post("/", makeExpressCallback(blogCreateNew));
  blogRouter.post("/report/:blogId", makeExpressCallback(blogPostRepost));
  // update requred in blog/:blogId/<PUT<publish/unpublist/premenentDelete/>>

  /** COMMENTS - routes  */
  commentsRouter.get("/:blogId", makeExpressCallback(commentsGetWithBlogId));
  commentsRouter.put("/:blogId", mustLoginAsUser, makeExpressCallback(commentsPostWithBlogId));
  commentsRouter.delete("/commentId", makeExpressCallback(commentsDelete));
  // update required in comment/:blogId/:commentId/<DELETE<deleteComment>> remove requirement to blogID for deletion

  /** TRASH - routes */
  // Every route in trash need user to be logged in
  trashRouter.use(mustLoginAsUser);
  trashRouter.get("/", makeExpressCallback(trashGetByUser));
  trashRouter.put("/:blogId", makeExpressCallback(trashRecoverById));
  trashRouter.delete("/:blogId", makeExpressCallback(trashDeleteById));

  /** REACTIONS - routes */
  reactionsRouter.get("/:blogId", makeExpressCallback(reactionsGetByBlogId));
  reactionsRouter.post("/:blogId/like", mustLoginAsUser, makeExpressCallback(reactionsPostLike));
  reactionsRouter.delete("/:blogId/like", mustLoginAsUser, makeExpressCallback(reactionsDeleteLike));
  reactionsRouter.post("/:blogId/dislike", mustLoginAsUser, makeExpressCallback(reactionsPostDislike));
  reactionsRouter.delete("/:blogId/dislike", mustLoginAsUser, makeExpressCallback(reactionsDeleteDislike));

  /** ANALYTICS - routes */
  analyticsRouter.get("/views/:blogId", mustLoginAsUser, makeExpressCallback(analyticsGetViewsByBlogId));
  analyticsRouter.get("/views/", mustLoginAsUser, makeExpressCallback(analyticsGetAllViewsByUser));

  /** VIEWS - routes */
  viewsRouter.get("/:blogId", makeExpressCallback(viewsGetByBlogId));
  viewsRouter.post("/:blogId", makeExpressCallback(viewsAddNewByBlogId));

  /** SEARCH - routes */
  // searches and returns blogs
  searchRouter.get("/", makeExpressCallback(searchGetBlogsByQuery));
  // searches and returns list of categorys available - mostly used for autocompletion
  searchRouter.get("/category", makeExpressCallback(searchGetCategorysWithQuery));

  /** USERS - routers */
  usersRouter.get("/:userId", makeExpressCallback(userGetAllBlogs));

  router.use("/blog", blogRouter);
  router.use("/view", viewsRouter);
  router.use("/comment", commentsRouter);
  router.use("/reaction", reactionsRouter);
  router.use("/search", searchRouter);
  router.use("/analytics", analyticsRouter);
  router.use("/trash", trashRouter);
  router.use("/user", usersRouter);

  return router;
}
