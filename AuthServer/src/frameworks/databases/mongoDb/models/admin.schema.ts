import { Schema } from "mongoose";

export interface AdminUser {
  name?: string;
  email?: string;
  uid?: string;
  password?: string;
  img?: string;
  photoURL?: string;
  phone?: string;
  disabled?: boolean;
  admin?: boolean;
  createdAt?: Date;
  lastLogin?: Date;
  lastRefresh?: Date;
  phoneVerified?: boolean;
  emailVerified?: boolean;
}

export const adminUserSchema = new Schema({
  name: String,
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

export default adminUserSchema;
