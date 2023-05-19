import ExpressApp from "express";
import validatorImpl from "../../services/validator/validatorImpl";
import validatorInteraface from "../../../application/services/validatorInteraface";
import authServiceImpl from "../../services/authServices";
import authServiceInterface from "../../../application/services/authServices";
import tokenRepositoryImpl from "../../databases/mongoDb/repository/tockensRepositoryImpl";
import tokenRepositoryInteraface from "../../../application/repository/tokensRepositoryInteraface";
import userRepositoryImpl from "../../databases/mongoDb/repository/userRepositoryImpl";
import userRepositoryInteraface from "../../../application/repository/userRepositoryInteraface";
import userController from "../../../adapter/controllers/userController";
import otpRepositoryInterface from "../../../application/repository/otpRepositoyInteraface";
import otpRepositoryImpl from "../../databases/mongoDb/repository/otpRepositoryImpl";
import followsRepositoryInterface from "../../../application/repository/followsRepositoryInterface";
import followsRepositoryImpl from "../../databases/mongoDb/repository/followsRepositoryImpl";
import GetExpress from "dynotxt-common-services/build/express";
import GetJwt from "dynotxt-common-services/build/jwt";
import GetEmail from "dynotxt-common-services/build/email";
import GetUtils from "dynotxt-common-services/build/utils";
import getConfigs from "../../../configs";

export default function v1UserRouter(express: typeof ExpressApp) {
  const router = express.Router();
  const config = getConfigs();

  const expressService = new GetExpress();
  const emailService = new GetEmail(config.email.user, config.email.pass);
  const utilService = new GetUtils();
  const userJwtService = new GetJwt({
    accessTokenSecret: config.jwt.user.accessSecret,
    accessTokenOptions: config.jwt.user.accessOptions,
    refreshTokenSecret: config.jwt.user.refreshSecret,
    refreshTokenOptions: config.jwt.user.refreshOptions,
  });

  const validator = validatorInteraface(validatorImpl());
  const userRepository = userRepositoryInteraface(userRepositoryImpl());
  const tokenRepository = tokenRepositoryInteraface(tokenRepositoryImpl());
  const followsRepository = followsRepositoryInterface(followsRepositoryImpl());
  const authService = authServiceInterface(authServiceImpl());
  const otpRepository = otpRepositoryInterface(otpRepositoryImpl());

  const controller = userController(
    userRepository,
    tokenRepository,
    otpRepository,
    followsRepository,
    authService,
    validator,
    userJwtService,
    emailService,
    utilService
  );

  router.use(expressService.createAuthInit({ userJwt: userJwtService }));

  router
    .route("/verify_email/:uid")
    .get(expressService.makeExpressCallback(controller.getUserEmailVerificationStatus))
    .post(expressService.makeExpressCallback(controller.postVerifyEmailWithOtp));
  router.route("/logout").get(expressService.makeExpressCallback(controller.getUserLogout));
  router.route("/refresh").get(expressService.makeExpressCallback(controller.getNewAccessTokenFromRefreshToken));
  router.route("/signin").post(expressService.makeExpressCallback(controller.userPostSignin));
  router
    .route("/user_data")
    .get(expressService.makeExpressCallback(controller.getInitialUserDataFromRefreshToken))
    .put(expressService.mustLoginAsUser, expressService.makeExpressCallback(controller.putUpdatePublicUserData));
  router
    .route("/user_data/persional")
    .put(expressService.mustLoginAsUser, expressService.makeExpressCallback(controller.putUpdatePersionalUserData));
  router.route("/user/:id").get(expressService.makeExpressCallback(controller.getUserDataPublic));
  router
    .route("/profile/details")
    .get(expressService.mustLoginAsUser, expressService.makeExpressCallback(controller.getDataForCurrentUserDashboard));
  router
    .route("/follows/:uid")
    .post(expressService.mustLoginAsUser, expressService.makeExpressCallback(controller.postFollowNewUser))
    .get(expressService.mustLoginAsUser, expressService.makeExpressCallback(controller.getFollowingDataWithSingleUser))
    .delete(expressService.mustLoginAsUser, expressService.makeExpressCallback(controller.deleteUnfollowUser));

  return router;
}
