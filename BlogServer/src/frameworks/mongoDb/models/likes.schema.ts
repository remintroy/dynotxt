import { Schema } from "mongoose";

export const LikesSchema = new Schema({
  blogId: String,
  createdAt: { type: Date, default: new Date() },
  disabled: { type: Boolean, default: false },
  likes: [String],
});

export default LikesSchema;
