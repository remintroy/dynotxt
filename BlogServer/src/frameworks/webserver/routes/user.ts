import ExpressApp, { Response } from "express";
import { RequestWithUser } from "../express";
import blogRepositoryInteraface from "../../../adaptor/repositorys/blogRepositoryInteraface";
import blogRepositoryImpl from "../../mongoDb/repository/blogRepositoryImpl";
// eslint-disable-next-line import/order
import GetUtils from "dynotxt-common-services/utils";
import userController from "../../../adaptor/controllers/userController";
import makeExpressResponseCallback from "../callbacks/createExpressCallback";
import mustLoginAsUser from "../middleware/mustLoginAsUser";
import blogServiceInterface from "../../../adaptor/service";
import blogServiceImpl from "../../services";

export default function userRouter(express: typeof ExpressApp) {
  const router = express.Router();

  const blogRepository = blogRepositoryInteraface(blogRepositoryImpl());
  const blogService = blogServiceInterface(blogServiceImpl());
  const utils = new GetUtils();

  const controller = userController(
    blogRepository,
    blogService,
    utils.createError
  );

  // CRED routes on blog
  router
    .route("/blog")
    .post(
      mustLoginAsUser,
      makeExpressResponseCallback(controller.postUserNewBlog)
    );

  // single blog manipulation
  router
    .route("/blog/:id")
    .put(
      mustLoginAsUser,
      makeExpressResponseCallback(controller.putUserUpdateBlog)
    );

  // Upload url for uploading banner to s3
  router
    .route("/upload/:id")
    .get(
      mustLoginAsUser,
      makeExpressResponseCallback(controller.getUserBlogUploadUrl)
    );

  return router;
}
