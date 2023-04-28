import { Schema } from "mongoose";

export interface IUser {
  userName: string;
  name: string;
  email: string;
  uid: string;
  photoURL: string;
  privateAccount: boolean;
  dob: Date;
  disabled: boolean;
  createdAt: Date;
  emailVerified: boolean;
  hash: string;
}

export const userSchema = new Schema({
  userName: String,
  name: String,
  email: String,
  uid: String,
  photoURL: String,
  privateAccount: {
    type: Boolean,
    default: false,
  },
  dob: Date,
  disabled: { type: Boolean, default: false },
  createdAt: { type: Date, default: new Date() },
  emailVerified: { type: Boolean, default: false },
  hash: String,
});
