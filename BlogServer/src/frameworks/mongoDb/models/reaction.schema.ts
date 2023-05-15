import { Schema } from "mongoose";

const reactionsSchema = new Schema({
  blogId: String,
  userId: String,
  value: String,
  createAt: {
    type: Date,
    default: new Date(),
  },
});

export default reactionsSchema;
