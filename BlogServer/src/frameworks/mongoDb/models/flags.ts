import { model } from "mongoose";
import flagsSchema from "./flags.schema";

const FlagsModel = model<flagsSchema>("flags", flagsSchema);

export default FlagsModel;
