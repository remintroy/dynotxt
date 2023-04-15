import { blogValidator } from "../validator";
import createMakeBlog from "./blog";

export const makeBlog = createMakeBlog({ validator: blogValidator });

export default makeBlog;
