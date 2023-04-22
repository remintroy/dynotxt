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

export default function userRouter(express: typeof ExpressApp) {
  const router = express.Router();

  const utils = utilService;
  const email = emailService;
  const validator = validatorInteraface(validatorImpl());
  const userRepository = userRepositoryInteraface(userRepositoryImpl());
  const tokenRepository = tokenRepositoryInteraface(tokenRepositoryImpl());
  const authService = authServiceInterface(authServiceImpl());
  const otpRepository = otpRepositoryInterface(otpRepositoryImpl());

  const controller = userController(
    userRepository,
    tokenRepository,
    otpRepository,
    authService,
    validator,
    utils.createError,
    email
  );

  router.use(authMiddleware);

  router
    .route("/verify_email")
    .get(makeExpressResponseCallback(controller.getUserEmailVerificationStatus))
    .post(makeExpressResponseCallback(controller.postVerifyEmail));
  router
    .route("/logout")
    .get(makeExpressResponseCallback(controller.getUserLogout));
  router
    .route("/refresh")
    .get(makeExpressResponseCallback(controller.getUserRefresh));
  router
    .route("/signin")
    .post(makeExpressResponseCallback(controller.userPostSignin));
  router
    .route("/user_data")
    .get(makeExpressResponseCallback(controller.getUserData))
    .post(makeExpressResponseCallback(controller.postUserUpdate));

  return router;
}
