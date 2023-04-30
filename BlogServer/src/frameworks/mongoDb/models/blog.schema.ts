import { Schema } from "mongoose";

export const BlogSchema = new Schema({
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
  bannerImgURL: String,
  version: { type: Number, default: 0 },
  body: [],
});

export default BlogSchema;
