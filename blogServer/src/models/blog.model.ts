import mongoose from "mongoose";

export default mongoose.model(
  "blogs",
  new mongoose.Schema({
    createdAt: Date,
    updatedAt: Date,
    published: Boolean,
    blogId: String,
    author: String,
    title: String,
    views: Number,
    bannerImgURL: String,
    body: [],
  })
);
