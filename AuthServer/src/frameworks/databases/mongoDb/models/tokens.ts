import { model } from "mongoose";
import { IToken, tockenSchema } from "./tokens.schema";

const tokensModel = model<IToken>("tokens", tockenSchema);

export default tokensModel;
