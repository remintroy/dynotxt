import { Schema } from "mongoose";

export interface IOtp {
  otp?: string;
  uid?: string;
  email?: string;
  createdAt?: Date;
  expiresAt?: Date;
  forUser?: boolean;
  forAdmin?: boolean;
  reason?: string;
}

export const optSchema = new Schema({
  otp: {
    type: String,
  },
  uid: String, // for normal user
  email: String, // for admin user
  createdAt: {
    type: Date,
    default: new Date(),
  },
  expiresAt: {
    type: Date,
    default: new Date(),
    expires: 60 * 10,
  },
  forUser: {
    default: true,
    type: Boolean,
  },
  forAdmin: Boolean,
  reason: String,
});
