import { Schema } from "mongoose";

export const adminUserSchema = new Schema({
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

export const adminRefreshTokenSchema = new Schema({
  value: String,
  uid: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

export const userSchema = new Schema({
  name: String,
  email: String,
  uid: String,
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
});

export const refreshTokenSchema = new Schema({
  value: String,
  uid: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

export const otpSchema = new Schema({
  otp: String,
  uid: String, // for normal user
  email: String, // for admin user
  createdAt: {
    type: Date,
    default: new Date(),
  },
  expiresAt: {
    type: Date,
    default: new Date(new Date().getTime() + 10 * 60000), // validity is defaulted to 10 minutes
  },
  forUser: Boolean,
  forAdmin: Boolean,
});
