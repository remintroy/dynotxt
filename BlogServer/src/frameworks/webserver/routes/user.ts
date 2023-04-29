import ExpressApp, { Response } from "express";
import { RequestWithUser } from "../express";
import mustLoginAsAdmin from "../middleware/mustLoginAsAdmin";

export default function userRouter(express: typeof ExpressApp) {
  const router = express.Router();

  // CRED routes on blog
  router
    .route("/blog")
    .get(mustLoginAsAdmin, (req: RequestWithUser, res: Response) => {
      res.send({ message: req.admin });
    })
    .post()
    .put();

  return router;
}
