import { createBlogValidator } from "./blog.validator";
import { getBlogById } from "../data-access/blog.db";

export const blogValidator = createBlogValidator({ getBlogById });

