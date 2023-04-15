import { Schema } from "mongoose";

export const BlogSchema = new Schema({
  createdAt: Date,
  updatedAt: Date,
  published: Boolean,
  blogId: String,
  author: String,
  title: String,
  views: Number,
  bannerImgURL: String,
  body: [],
});
