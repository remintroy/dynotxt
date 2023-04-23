import ExpressApp from "express";
import makeExpressResponseCallback from "./callback/expressCallBack";
import adminController from "../../../adapter/controllers/adminController";
import adminUserRepositoryInteraface from "../../../application/repository/adminUserRepositoryInteraface";
import adminUserRepositoryImpl from "../../databases/mongoDb/repository/adminRepositoryImpl";
import tokenRepositoryInteraface from "../../../application/repository/tokensRepositoryInteraface";
import tokenRepositoryImpl from "../../databases/mongoDb/repository/tockensRepositoryImpl";
import authServiceImpl from "../../services/authServices";
import authServiceInterface from "../../../application/services/authServices";
import validatorInteraface from "../../../application/services/validatorInteraface";
import validatorImpl from "../../services/validator/validatorImpl";
import { utilService } from "../../../application/services/commonServices";

export default function adminRoute(express: typeof ExpressApp) {
  const router = express.Router();

  const adminRepository = adminUserRepositoryInteraface(
    adminUserRepositoryImpl()
  );
  const utils = utilService;
  const tokenRepository = tokenRepositoryInteraface(tokenRepositoryImpl());
  const authService = authServiceInterface(authServiceImpl());
  const validator = validatorInteraface(validatorImpl());

  const controller = adminController(
    adminRepository,
    tokenRepository,
    authService,
    validator,
    utils.createError
  );

  router
    .route("/signin")
    .post(makeExpressResponseCallback(controller.signInAdminUser));
  router
    .route("/user_data")
    .get(makeExpressResponseCallback(controller.getAdminUserData));

  return router;
}
