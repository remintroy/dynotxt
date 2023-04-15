import mongoose from "mongoose";
import { BlogSchema } from "./blog.schemas";
import { IBlogModel } from "./blog.types";

export default mongoose.model<IBlogModel>("blogs", BlogSchema);
