import { Schema } from "mongoose";

interface flagsSchema {
  blogId?: string;
  userId?: string;
  createdAt?: string;
  status?: string;
  reason?: string;
}

const flagsSchema = new Schema({
  blogId: String,
  userId: String,
  createdAt: { type: Date, default: new Date() },
  status: String,
  reason:String
});

export default flagsSchema;
