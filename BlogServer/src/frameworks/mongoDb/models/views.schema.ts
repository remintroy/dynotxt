import { Schema } from "mongoose";

interface viewsSchema {
  blogId: string;
  userId: string;
  createdAt: Date;
  region: string;
}

const viewsSchema = new Schema({
  blogId: { type: String, required: true },
  userId: { type: String, required: true },
  createdAt: { type: Date, default: new Date() },
  region: String,
});

export default viewsSchema;
