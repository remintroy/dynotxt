import { Schema } from "mongoose";

export const CommentSchema = new Schema({
  blogId: String,
  owner: String,
  createdAt: { type: Date, default: new Date() },
  updatedAt: { type: Date, default: new Date() },
  disabled: { type: Boolean, default: false },
  comment: [
    {
      uid: String,
      createdAt: { type: Date, default: new Date() },
      message: String,
      replays: [
        {
          uid: String,
          message: String,
          createdAt: { type: Date, default: new Date() },
        },
      ],
    },
  ],
});

export default CommentSchema;
