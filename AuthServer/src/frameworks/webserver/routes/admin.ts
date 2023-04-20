import ExpressApp from "express";

export default function adminRoute(express: typeof ExpressApp) {
  const adminRouter = express.Router();

  return adminRouter;
}
