import ExpressApp from "express";
import userController from "../../../adapter/controllers/userController";
import useDbrRepository from "../../../application/repository/userDbRepository";
import userRepositoryMongoDB from "../../databases/mongoDb/repository/userRepositoryMongoDb";
import authServiceImpl from "../../services/authServices";
import { getEmail, getUtils } from "dynotxt-common-services";
import normalUserValidator from "../../../application/services/normalUserValidator";
import normalUserValidatorImpl from "../../services/validator/user";
import { getConfigs } from "../../../configs";
import tokenRepositoryMongoDB from "../../databases/mongoDb/repository/tockensRepositoryMongoDb";
import tokenDbRepository from "../../../application/repository/tokensDbRepository";
import makeExpressResponseCallback from "./callback/expressCallBack";
import authServiceInterface from "../../../application/services/authServices";

export default function userRouter(express: typeof ExpressApp) {
  const userRouter = express.Router();

  const config = getConfigs();

  const utils = getUtils();
  const email = getEmail(config.email.user, config.email.pass);

  const validator = new normalUserValidator(new normalUserValidatorImpl());
  const userRepository = new useDbrRepository(new userRepositoryMongoDB());
  const tokenRepository = new tokenDbRepository(new tokenRepositoryMongoDB());
  const authService = new authServiceInterface(new authServiceImpl());

  const controller = new userController(userRepository, tokenRepository, authService, validator, utils.createError, email);

  userRouter.route("/user_data").get().post();
  userRouter.route("/refresh").get();
  userRouter.route("/logout").get();
  userRouter.route("/verify_email").get().post();
  userRouter.route("/signin").post(makeExpressResponseCallback(controller.userPostSignin));

  return userRouter;
}
