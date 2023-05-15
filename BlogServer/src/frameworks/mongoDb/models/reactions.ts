import { model } from "mongoose";
import reactionsSchema from "./reaction.schema";
import Reactions from "../../../entities/reactions";

const ReactionModel = model<Reactions>('reactions', reactionsSchema);

export default ReactionModel;