import ExpressApp, { Express } from "express";
import getConfigs from "../../../configs";
import v1UserRouter from "./user";
import v1AdminRoute from "./admin";
import GetExpress from "dynotxt-common-services/build/express";

export default function routes(app: Express, express: typeof ExpressApp, configs: typeof getConfigs) {
  const config = configs();
  const expressService = new GetExpress();
  app.use(`${config.server.appBaseUrl}/api/v1`, v1UserRouter(express));
  app.use(`${config.server.adminBaseUrl}/api/v1`, v1AdminRoute(express));
  app.use(expressService.notFoundMiddleware);
}
