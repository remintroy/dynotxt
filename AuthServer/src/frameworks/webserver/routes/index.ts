import ExpressApp, { Express } from "express";
import getConfigs from "../../../configs";
import userRouter from "./user";
import adminRoute from "./admin";

export default function routes(
  app: Express,
  express: typeof ExpressApp,
  configs: typeof getConfigs,
) {
  const config = configs();
  app.use(`${config.server.appBaseUrl}/api/v1`, userRouter(express));
  app.use(`${config.server.adminBaseUrl}/api/v1`, adminRoute(express));
}
