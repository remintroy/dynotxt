import { Schema } from "mongoose";

export const BlogSchema = new Schema({
  disabled: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  updatedAt: {
    type: Date,
    default: new Date(),
  },
  subtitle: String,
  published: {
    type: Boolean,
    default: false,
  },
  blogId: String,
  author: String,
  title: String,
  views: {
    type: Number,
    default: 0,
  },
  deleted: {
    type: Boolean,
    default: false,
  },
  bannerImgURL: String,
  version: { type: Number, default: 0 },
  body: [],
});

export default BlogSchema;
