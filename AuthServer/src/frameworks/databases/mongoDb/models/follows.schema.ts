import { Schema } from "mongoose";

const followsSchema = new Schema({
  follower: { type: String, required: true },
  following: { type: String, required: true },
  createdAt: { type: Date, default: new Date() },
  accepeted: { type: Boolean, default: false },
  isBlocked: { type: Boolean, default: false },
});

export default followsSchema;