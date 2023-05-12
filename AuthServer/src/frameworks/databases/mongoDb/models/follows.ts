import { model } from "mongoose";
import followsSchema from "./follows.schema";
import Follows from "../../../../entities/follows";

const FollowsModel = model<Follows>("follows", followsSchema);

export default FollowsModel;
