import { utils } from "../services";
import createAddBlog from "./add-blog";

export const addBlog = createAddBlog({ createError: utils.createError });

export default {
  addBlog,
};
