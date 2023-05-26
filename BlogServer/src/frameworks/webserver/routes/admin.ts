import ExpressApp from "express";
import flagsRepositoryInterface from "../../../adaptor/repositorys/flagsRepositoryInterface";
import flagsRepositoryImpl from "../../mongoDb/repository/flagsReporitoryImpl";
import adminController from "../../../adaptor/controllers/adminController";
import blogRepositoryInteraface from "../../../adaptor/repositorys/blogRepositoryInteraface";
import blogRepositoryImpl from "../../mongoDb/repository/blogRepositoryImpl";
import GetUtils from "dynotxt-common-services/build/utils";
import GetJwt from "dynotxt-common-services/build/jwt";
import getConfigs from "../../../configs";
import GetExpress from "dynotxt-common-services/build/express";

export default function adminRoute(express: typeof ExpressApp) {
  const router = express.Router();
  const config = getConfigs();

  const expressService = new GetExpress();
  const utilsService = new GetUtils();
  const jwtService = new GetJwt({
    accessTokenSecret: config.jwt.admin,
  });

  const flagsRepository = flagsRepositoryInterface(flagsRepositoryImpl());
  const blogRepository = blogRepositoryInteraface(blogRepositoryImpl());

  const controller = adminController(blogRepository, flagsRepository, utilsService);

  router.use(expressService.createAuthInit({ adminJwt: jwtService }));

  router
    .route("/blog/flagged")
    .get(expressService.mustLoginAsAdmin, expressService.makeExpressCallback(controller.getAllFlaggedBlogs));
  router
    .route("/blog/flagged/:id")
    .put(expressService.mustLoginAsAdmin, expressService.makeExpressCallback(controller.putDisableFlaggedBlog))
    .delete(expressService.mustLoginAsAdmin, expressService.makeExpressCallback(controller.deleteAllFlagsForSigleBlog));
  router
    .route("/blog/flagged/:id/enable")
    .put(expressService.mustLoginAsAdmin, expressService.makeExpressCallback(controller.putEnableFlaggedBlog));

  router
    .route("/blog/disabled/")
    .get(expressService.mustLoginAsAdmin, expressService.makeExpressCallback(controller.getAllDisabledBlogs));

  return router;
}
