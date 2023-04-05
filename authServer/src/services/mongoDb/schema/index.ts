import { Schema } from "mongoose";
import { IAdminRefreshToken, IAdminUser, IRefreshToken, IUser } from "../defenition";

export const adminUserSchema = new Schema<IAdminUser>({
  name: "String",
  email: String,
  uid: String,
  password: String,
  img: String,
  photoURL: String,
  phone: { type: String, default: null },
  disabled: { type: Boolean, default: false },
  admin: { type: Boolean, default: true },
  createdAt: { type: Date, default: new Date() },
  lastLogin: { type: Date, default: new Date() },
  lastRefresh: { type: Date, default: new Date() },
  phoneVerified: { type: Boolean, default: false },
  emailVerified: { type: Boolean, default: false },
});

export const adminRefreshTokenSchema = new Schema<IAdminRefreshToken>({
  value: String,
  uid: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

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

export const refreshTokenSchema = new Schema<IRefreshToken>({
  value: String,
  uid: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
});
