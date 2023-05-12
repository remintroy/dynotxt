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
import userRepositoryInteraface from "../../../application/repository/userRepositoryInteraface";
import userRepositoryImpl from "../../databases/mongoDb/repository/userRepositoryImpl";
import adminAuthMiddleware from "../middleware/adminAuthMiddleware";
import mustLoginAsAdmin from "../middleware/mustLoginAsAdmin";

export default function v1AdminRoute(express: typeof ExpressApp) {
  const router = express.Router();

  const adminRepository = adminUserRepositoryInteraface(
    adminUserRepositoryImpl()
  );
  const utils = utilService;
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
    utils.createError
  );

  router.use(adminAuthMiddleware);

  router
    .route("/signin")
    .post(makeExpressResponseCallback(controller.signInAdminUser));
  router
    .route("/user_data")
    .get(makeExpressResponseCallback(controller.getAdminUserData));
  router
    .route("/client")
    .get(
      mustLoginAsAdmin,
      makeExpressResponseCallback(controller.getAdminAllUserDataAsPage)
    );
  router
    .route("/client/:uid/:action")
    .put(
      mustLoginAsAdmin,
      makeExpressResponseCallback(controller.putAdminChangeUserState)
    );
  router
    .route("/client/disabled")
    .get(
      mustLoginAsAdmin,
      makeExpressResponseCallback(controller.getAdminAllBlockedUsers)
    );
  router
    .route("/logout")
    .get(
      mustLoginAsAdmin,
      makeExpressResponseCallback(controller.getAdminLogout)
    );

  return router;
}
