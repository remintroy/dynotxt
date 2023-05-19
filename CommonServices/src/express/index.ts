import GetJwt from "../jwt/index.js";

/**
 * Get common express callback and middlewares
 */
export default class GetExpress {
  /**
   * Express callback generator which creates and handles errors from controller functions.
   * @param controller Controller Promise function to be executed
   * @returns a callback for express
   */
  makeExpressCallback(controller: any) {
    return async (req: any, res: any) => {
      try {
        const response = await controller(req, res);
        res.send(response);
      } catch (error) {
        res.status(error?.code ? error.code : 500);
        res.send(error);
      }
    };
  }

  /**
   *
   * @param userJwt User jwt intance with user config
   * @param adminJwt Admin jwt intance with admin config which is optional
   * @returns A middleware for express
   */
  createAuthInit({ userJwt, adminJwt }: { userJwt?: GetJwt; adminJwt?: GetJwt }) {
    return async (req: any, res: any, next: any) => {
      const accessToken = req.headers?.authorization?.split(" ")?.[1];
      // user
      if (userJwt) {
        try {
          req.user = userJwt.verifyAccessToken(accessToken) || null;
        } catch (error) {
          req.user = null;
        }
      } else {
        req.user = null;
      }
      // admin
      if (adminJwt) {
        try {
          req.admin = adminJwt.verifyAccessToken(accessToken) || null;
        } catch (error) {
          req.admin = null;
        }
      } else {
        req.admin = null;
      }
      next();
    };
  }

  /**
   * Middleware which allows only authenticated request to pass to next middleware in context of req.user
   * @param req Request Express
   * @param res Response Express
   * @param next NextFunction Express
   */
  mustLoginAsUser(req: any, res: any, next: any) {
    if (req.user) next();
    else {
      res.status(401);
      res.send({ code: 401, status: "error", message: "Unauthorized action" });
    }
  }

  /**
   * Middleware which allows only authenticated request to pass to next middleware in context of req.admin
   * @param req Request Express
   * @param res Response Express
   * @param next NextFunction Express
   */
  mustLoginAsAdmin(req: any, res: any, next: any) {
    if (req.admin) next();
    else {
      res.status(401);
      res.send({ code: 401, status: "error", message: "Unauthorized action" });
    }
  }

  /**
   * Error handling middleware
   * @param err Express Error
   * @param req Express Request
   * @param res Express Response
   * @param next Express Next function
   */
  errorHandlingMiddleWare(err: any, req: any, res: any, next: any) {
    const code = Number(err.code) || 500;
    res.status(code);
    res.send({ code, error: err?.error, message: err?.message });
  }

  /**
   * Error handlier for not found 404
   * @param req Express Request
   * @param res Express Response
   */
  notFoundMiddleware(req: any, res: any) {
    res.status(404);
    res.send({ code: 404, status: "The service you are looking for is not on this server", message: "Not found" });
  }
}
