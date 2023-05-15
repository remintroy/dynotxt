import { Schema } from "mongoose";

export interface IUser {
  userName: string;
  name: string;
  bio: string;
  email: string;
  uid: string;
  provider: string;
  img: string;
  photoURL: string;
  phone: string;
  referal: string;
  referedBy: string;
  privateAccount: boolean;
  dob: Date;
  gender: string;
  disabled: boolean;
  admin: boolean;
  createdAt: Date;
  lastLogin: Date;
  lastRefresh: Date;
  phoneVerified: boolean;
  emailVerified: boolean;
  hash: string;
}

export const userSchema = new Schema({
  userName: String,
  name: String,
  email: String,
  uid: String,
  bio: String,
  provider: String,
  img: String,
  photoURL: String,
  referal: String,
  referedBy: String,
  privateAccount: {
    type: Boolean,
    default: false,
  },
  dob: Date,
  gender: String,
  phone: { type: String, default: null },
  disabled: { type: Boolean, default: false },
  admin: { type: Boolean, default: false },
  createdAt: { type: Date, default: new Date() },
  lastLogin: { type: Date, default: new Date() },
  lastRefresh: { type: Date, default: new Date() },
  phoneVerified: { type: Boolean, default: false },
  emailVerified: { type: Boolean, default: false },
  hash: String,
});
