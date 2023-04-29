import ExpressApp, { Response } from "express";
import { RequestWithUser } from "../express";
import blogRepositoryInteraface from "../../../adaptor/repositorys/blogRepositoryInteraface";
import blogRepositoryImpl from "../../mongoDb/repository/blogRepositoryImpl";
// eslint-disable-next-line import/order
import GetUtils from "dynotxt-common-services/utils";
import userController from "../../../adaptor/controllers/userController";
import makeExpressResponseCallback from "../callbacks/createExpressCallback";
import mustLoginAsUser from "../middleware/mustLoginAsUser";

export default function userRouter(express: typeof ExpressApp) {
  const router = express.Router();

  const blogRepository = blogRepositoryInteraface(blogRepositoryImpl());
  const utils = new GetUtils();

  const controller = userController(blogRepository, utils.createError);

  // CRED routes on blog
  router
    .route("/blog")
    .get(mustLoginAsUser, (req: RequestWithUser, res: Response) => {
      res.send({ message: req.user });
    })
    .post(
      mustLoginAsUser,
      makeExpressResponseCallback(controller.postUserNewBlog)
    )
    .put();

  return router;
}
