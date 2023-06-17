import getConfigs from "../../configs";
import { Blog } from "../../entities/blog";

const mustBeAStirng = (value: string, createError, name = "Value") => {
  if (typeof value === "string") return value.trim();
  throw createError(400, `${name} must be a string`);
};

const mustMinChar = (value: string, minLen: number, createError, name = "Value") => {
  if (value.length > minLen) return value;
  throw createError(400, `${name} must be greater than ${minLen} characters`);
};

const mustMaxChar = (value: string, maxLen: number, createError, name = "Value") => {
  if (value.length < maxLen) return value;
  throw createError(400, `${name} must be less than ${maxLen} characters`);
};

// const mustBeArray = (array: [], createError, name = "Value") => {
//   if (Array.isArray(array)) return array;
//   throw createError(400, `${name} must be an array`);
// };

export const blogValidator = (blogBody: Blog, createError: any, noIds?: boolean) => {
  let { title, subtitle, author, bannerImgURL, blogId, body, category, published } = blogBody;

  const config = getConfigs();
  const output: Blog = {};

  const minTitleLength = config.blog.title.minChar;
  const maxTitleLength = config.blog.title.maxChar;
  const maxSubtitleLength = config.blog.subtitle.maxChar;
  const { blogIdLength, authorLength } = config.blog;

  if (!author) throw createError(400, "Author is requried to create a blog");
  if (!blogId) throw createError(400, "BlogId is requried to create a blog");

  author = mustBeAStirng(author, createError, "Author");
  blogId = mustBeAStirng(blogId, createError, "BlogId");

  if (!noIds) {
    output.author = author;
    output.blogId = blogId;
  }

  if (author.length !== authorLength) throw createError(400, "Invalid author");
  if (blogId.length !== blogIdLength) throw createError(400, "Invalid blogId");

  if (title) {
    title = mustBeAStirng(title, createError, "Title");
    mustMaxChar(title, maxTitleLength, createError, "Title");
    mustMinChar(title, minTitleLength, createError, "Title");
    output.title = title;
  }

  if (subtitle) {
    subtitle = mustBeAStirng(subtitle, createError, "Subtitle");
    mustMaxChar(subtitle, maxSubtitleLength, createError, "Subtitle");
    output.subtitle = subtitle;
  }

  if (bannerImgURL) {
    bannerImgURL = mustBeAStirng(bannerImgURL, createError, "Banner Image URL");
    output.bannerImgURL = bannerImgURL;
  }

  if (body) {
    output.body = body;
  }

  if (category) {
    output.category = category?.map((tag: string) => tag?.toLowerCase());
  }

  if (published !== undefined) {
    output.published = published;
  }

  return output;
};

export default {
  blogValidator,
};
