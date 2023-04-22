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

export default function userRouter(express: typeof ExpressApp) {
  const router = express.Router();

  const utils = utilService;
  const email = emailService;
  const validator = validatorInteraface(validatorImpl());
  const userRepository = userRepositoryInteraface(userRepositoryImpl());
  const tokenRepository = tokenRepositoryInteraface(tokenRepositoryImpl());
  const authService = authServiceInterface(authServiceImpl());

  const controller = userController(
    userRepository,
    tokenRepository,
    authService,
    validator,
    utils.createError,
    email
  );

  router.use(authMiddleware);

  router.route("/user_data").get().post();
  router.route("/verify_email").get().post();
  router.route("/logout").get();
  router
    .route("/update")
    .post(makeExpressResponseCallback(controller.postUserUpdate));
  router
    .route("/refresh")
    .get(makeExpressResponseCallback(controller.getUserRefresh));
  router
    .route("/signin")
    .post(makeExpressResponseCallback(controller.userPostSignin));

  return router;
}
