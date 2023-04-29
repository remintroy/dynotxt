import ExpressApp, { Express } from "express";
import getConfigs from "../../../configs";
import userRouter from "./user";
import adminRoute from "./admin";
import notFoundError from "../middleware/notFound";
import errorHandlingMiddlware from "../middleware/errorHandling";
import createAuthMiddleware from "../middleware/createAuthMiddleware";
import {
  adminJwtServiceInteraface,
  userJwtServiceInteraface,
} from "../../../adaptor/commonServices";
import { adminJwtServiceImpl, userJwtServiceImpl } from "../../commonServices";

export default function routes(
  app: Express,
  express: typeof ExpressApp,
  configs: typeof getConfigs
) {
  const config = configs();
  const userJwt = userJwtServiceInteraface(userJwtServiceImpl);
  const adminJwt = adminJwtServiceInteraface(adminJwtServiceImpl);

  app.use(createAuthMiddleware(userJwt, adminJwt));

  app.use(`${config.server.appBaseUrl}/api/v1`, userRouter(express));
  app.use(`${config.server.adminBaseUrl}/api/v1`, adminRoute(express));

  app.all("*", notFoundError);
  app.use(errorHandlingMiddlware);
}
