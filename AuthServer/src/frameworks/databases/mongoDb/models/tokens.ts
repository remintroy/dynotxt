import { model } from "mongoose";
import { IToken, tockenSchema } from "./tokens.schema";

const TokensModel = model<IToken>("tokens", tockenSchema);

export default TokensModel;
