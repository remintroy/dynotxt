import { createBlogValidator } from "./blog.validator";
import { blogDb } from "../data-access/";

export const blogValidator = createBlogValidator({ getBlogById: blogDb.getBlogById });
