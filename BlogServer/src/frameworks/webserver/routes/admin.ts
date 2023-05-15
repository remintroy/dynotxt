import ExpressApp from "express";
import flagsRepositoryInterface from "../../../adaptor/repositorys/flagsRepositoryInterface";
import { getUtils } from "dynotxt-common-services";
import flagsRepositoryImpl from "../../mongoDb/repository/flagsReporitoryImpl";
import adminController from "../../../adaptor/controllers/adminController";
import blogRepositoryInteraface from "../../../adaptor/repositorys/blogRepositoryInteraface";
import blogRepositoryImpl from "../../mongoDb/repository/blogRepositoryImpl";
import blogServiceInterface from "../../../adaptor/service";
import blogServiceImpl from "../../services";
import mustLoginAsAdmin from "../middleware/mustLoginAsAdmin";
import makeExpressResponseCallback from "../callbacks/createExpressCallback";

export default function adminRoute(express: typeof ExpressApp) {
  const router = express.Router();

  const utils = new getUtils();
  const flagsRepository = flagsRepositoryInterface(flagsRepositoryImpl());
  const blogRepository = blogRepositoryInteraface(blogRepositoryImpl());
  const blogService = blogServiceInterface(blogServiceImpl());

  const controller = adminController(blogRepository, blogService, flagsRepository, utils.createError);

  router.route("/blog/flagged").get(mustLoginAsAdmin, makeExpressResponseCallback(controller.getAllFlaggedBlogs));
  router
    .route("/blog/flagged/:id")
    .delete(mustLoginAsAdmin, makeExpressResponseCallback(controller.deleteAllFlagsForSigleBlog));

  return router;
}
