import { utils } from "../services";
import { blogValidator } from "../validator";
import { createBlogDb } from "./blog.db";
import { createUserDb } from "./users.db";

export const blogDb = createBlogDb({ createError: utils.createError, blogValidator });
export const userDb = createUserDb({ createError: utils.createError });
