import { model } from "mongoose";
import { IOtp, optSchema } from "./otp.schema";

const optModel = model<IOtp>("otps", optSchema);

export default optModel;
