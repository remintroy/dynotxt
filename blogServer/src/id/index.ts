import randomId from "random-id";
import createBlogId from "./blog.id";
import { appConfig } from "../configs";
import { blogValidator } from "../validator";

const config = appConfig();
const validator = blogValidator;

export const getBlogId = () =>
  createBlogId(randomId, {
    pattern: config.id.pattern,
    length: config.id.length,
    minLength: config.id.minLen,
    maxLength: config.id.maxLen,
    isBlogWithIdExist: validator.isBlogWithIdExist,
  });
