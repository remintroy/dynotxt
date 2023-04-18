import { model } from "mongoose";
import { BlogSchema } from "./blog.schemas";
import { IBlogModel } from "./blog.types";

export default model<IBlogModel>("blogs", BlogSchema);
