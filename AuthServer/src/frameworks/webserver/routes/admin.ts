import ExpressApp from "express";
import adminController from "../../../adapter/controllers/adminController";
import adminUserRepositoryInteraface from "../../../application/repository/adminUserRepositoryInteraface";
import adminUserRepositoryImpl from "../../databases/mongoDb/repository/adminRepositoryImpl";
import tokenRepositoryInteraface from "../../../application/repository/tokensRepositoryInteraface";
import tokenRepositoryImpl from "../../databases/mongoDb/repository/tockensRepositoryImpl";
import authServiceImpl from "../../services/authServices";
import authServiceInterface from "../../../application/services/authServices";
import validatorInteraface from "../../../application/services/validatorInteraface";
import validatorImpl from "../../services/validator/validatorImpl";
import userRepositoryInteraface from "../../../application/repository/userRepositoryInteraface";
import userRepositoryImpl from "../../databases/mongoDb/repository/userRepositoryImpl";
import GetExpress from "dynotxt-common-services/build/express";
import GetUtils from "dynotxt-common-services/build/utils";
import getConfigs from "../../../configs";
import GetJwt from "dynotxt-common-services/build/jwt";

export default function v1AdminRoute(express: typeof ExpressApp) {
  const router = express.Router();

  const config = getConfigs();

  const expressService = new GetExpress();
  const utilService = new GetUtils();
  const adminJwtService = new GetJwt({
    accessTokenSecret: config.jwt.admin.accessSecret,
    accessTokenOptions: config.jwt.admin.accessOptions,
    refreshTokenOptions: config.jwt.admin.refreshOptions,
    refreshTokenSecret: config.jwt.admin.refreshSecret,
  });

  const adminRepository = adminUserRepositoryInteraface(adminUserRepositoryImpl());
  const tokenRepository = tokenRepositoryInteraface(tokenRepositoryImpl());
  const authService = authServiceInterface(authServiceImpl());
  const userRepository = userRepositoryInteraface(userRepositoryImpl());
  const validator = validatorInteraface(validatorImpl());

  const controller = adminController(
    adminRepository,
    tokenRepository,
    userRepository,
    authService,
    validator,
    utilService,
    adminJwtService
  );

  router.use(expressService.createAuthInit({ adminJwt: adminJwtService }));

  router.route("/signin").post(expressService.makeExpressCallback(controller.postAdminSignin));
  router.route("/user_data").get(expressService.makeExpressCallback(controller.getAdminDataFromRefreshToken));
  router.route("/refresh").get(expressService.makeExpressCallback(controller.getNewAccessTokenFromRefreshToken));
  router
    .route("/client")
    .get(expressService.mustLoginAsAdmin, expressService.makeExpressCallback(controller.getUsersDataPagewise));
  router
    .route("/client/:uid/:action")
    .put(expressService.mustLoginAsAdmin, expressService.makeExpressCallback(controller.putUserChangeState));
  router
    .route("/client/disabled")
    .get(expressService.mustLoginAsAdmin, expressService.makeExpressCallback(controller.getUsersAllBlocked));
  router
    .route("/logout")
    .get(expressService.mustLoginAsAdmin, expressService.makeExpressCallback(controller.getAdminLogout));

  return router;
}
