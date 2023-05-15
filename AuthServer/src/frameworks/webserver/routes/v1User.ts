import ExpressApp from "express";
import makeExpressResponseCallback from "./callback/expressCallBack";
import authMiddleware from "../middleware/authMiddleware";
import validatorImpl from "../../services/validator/validatorImpl";
import validatorInteraface from "../../../application/services/validatorInteraface";
import authServiceImpl from "../../services/authServices";
import authServiceInterface from "../../../application/services/authServices";
import tokenRepositoryImpl from "../../databases/mongoDb/repository/tockensRepositoryImpl";
import tokenRepositoryInteraface from "../../../application/repository/tokensRepositoryInteraface";
import userRepositoryImpl from "../../databases/mongoDb/repository/userRepositoryImpl";
import userRepositoryInteraface from "../../../application/repository/userRepositoryInteraface";
import userController from "../../../adapter/controllers/userController";
import {
  emailService,
  utilService,
} from "../../../application/services/commonServices";
import otpRepositoryInterface from "../../../application/repository/otpRepositoyInteraface";
import otpRepositoryImpl from "../../databases/mongoDb/repository/otpRepositoryImpl";
import mustLoginAsUser from "../middleware/mustLoginAsUser";
import followsRepositoryInterface from "../../../application/repository/followsRepositoryInterface";
import followsRepositoryImpl from "../../databases/mongoDb/repository/followsRepositoryImpl";

export default function v1UserRouter(express: typeof ExpressApp) {
  const router = express.Router();

  const utils = utilService;
  const email = emailService;
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
    utils.createError,
    email
  );

  router.use(authMiddleware);

  router
    .route("/verify_email/:uid")
    .get(makeExpressResponseCallback(controller.getUserEmailVerificationStatus))
    .post(makeExpressResponseCallback(controller.postVerifyEmailWithOtp));
  router
    .route("/logout")
    .get(makeExpressResponseCallback(controller.getUserLogout));
  router
    .route("/refresh")
    .get(
      makeExpressResponseCallback(controller.getNewAccessTokenFromRefreshToken)
    );
  router
    .route("/signin")
    .post(makeExpressResponseCallback(controller.userPostSignin));
  router
    .route("/user_data")
    .get(
      makeExpressResponseCallback(controller.getInitialUserDataFromRefreshToken)
    )
    .put(
      mustLoginAsUser,
      makeExpressResponseCallback(controller.putUpdatePublicUserData)
    );
  router
    .route("/user_data/persional")
    .put(
      mustLoginAsUser,
      makeExpressResponseCallback(controller.putUpdatePersionalUserData)
    );
  router
    .route("/user/:id")
    .get(makeExpressResponseCallback(controller.getUserDataPublic));
  router
    .route("/profile/details")
    .get(
      mustLoginAsUser,
      makeExpressResponseCallback(controller.getDataForCurrentUserDashboard)
    );
  router
    .route("/follows/:uid")
    .post(
      mustLoginAsUser,
      makeExpressResponseCallback(controller.postFollowNewUser)
    )
    .get(
      mustLoginAsUser,
      makeExpressResponseCallback(controller.getFollowingDataWithSingleUser)
    )
    .delete(
      mustLoginAsUser,
      makeExpressResponseCallback(controller.deleteUnfollowUser)
    );

  return router;
}
