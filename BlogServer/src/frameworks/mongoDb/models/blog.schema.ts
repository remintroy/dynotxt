import { Schema } from "mongoose";

export const BlogSchema = new Schema({
  version: { type: Number, default: 0 },
  views: { type: Number, default: 0 },
  disabled: { type: Boolean, default: false },
  trashed: { type: Boolean, default: false },
  createdAt: { type: Date, default: new Date() },
  updatedAt: Date,
  deletedAt: Date,
  trashedAt: Date,
  published: { type: Boolean, default: false },
  subtitle: String,
  blogId: String,
  author: String,
  title: String,
  bannerImgURL: String,
  body: [],
});

export default BlogSchema;
