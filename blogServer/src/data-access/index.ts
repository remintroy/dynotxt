import blogModel from "../models/blog.model";
import { utils } from "../services";
import { blogValidator } from "../validator";
import { createBlogDb } from "./blog.db";

export const blogDb = createBlogDb({ createError: utils.createError, blogModel, blogValidator });
 