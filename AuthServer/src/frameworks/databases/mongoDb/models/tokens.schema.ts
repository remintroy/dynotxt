import { Schema } from "mongoose";

export interface IToken {
  value: string;
  uid: string;
  createdAt: Date;
  type: string;
}

export const tockenSchema = new Schema({
  value: String,
  type: {
    type: String,
    default: "refresh",
  },
  uid: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
});
