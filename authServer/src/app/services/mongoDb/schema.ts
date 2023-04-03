import { Schema } from "mongoose";

export interface IUser {
  name: string;
  email: string;
  uid: string;
  provider: string;
  img: string;
  photoURL: string;
  phone: string;
  referal: string;
  referedBy: string;
  disabled: boolean;
  admin: boolean;
  createdAt: Date;
  lastLogin: Date;
  lastRefresh: Date;
  phoneVerified: boolean;
  emailVerified: boolean;
}

export const userSchema = new Schema<IUser>({
  name: "String",
  email: String,
  uid: String,
  provider: String,
  img: String,
  photoURL: String,
  phone: { type: String, default: null },
  referal: String,
  referedBy: String,
  disabled: { type: Boolean, default: false },
  admin: { type: Boolean, default: false },
  createdAt: { type: Date, default: new Date() },
  lastLogin: { type: Date, default: new Date() },
  lastRefresh: { type: Date, default: new Date() },
  phoneVerified: { type: Boolean, default: false },
  emailVerified: { type: Boolean, default: false },
});

export interface IRefreshToken {
  value: string;
  uid: string;
  createdAt: Date;
}

export const refreshTokenSchema = new Schema<IRefreshToken>({
  value: String,
  uid: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
});
