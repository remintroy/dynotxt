import { model } from "mongoose";
import { IOtp, optSchema } from "./otp.schema";

const OptModel = model<IOtp>("otps", optSchema);

export default OptModel;
