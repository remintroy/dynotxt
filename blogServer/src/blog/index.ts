import { blogValidator } from "../validator";
import buildMakeBlog from "./blog";

export const makeBlog = buildMakeBlog({ validator: blogValidator });
