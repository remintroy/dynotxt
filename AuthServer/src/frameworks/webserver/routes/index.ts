import ExpressApp, { Express } from "express";
import getConfigs from "../../../configs";
import v1UserRouter from "./v1User";
import v1AdminRoute from "./v1Admin";

export default function routes(
  app: Express,
  express: typeof ExpressApp,
  configs: typeof getConfigs
) {
  const config = configs();
  app.use(`${config.server.appBaseUrl}/api/v1`, v1UserRouter(express));
  app.use(`${config.server.adminBaseUrl}/api/v1`, v1AdminRoute(express));
}
