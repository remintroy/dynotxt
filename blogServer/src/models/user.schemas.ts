import { Schema } from "mongoose";

export const userSchema = new Schema({
  name: String,
  email: String,
  uid: String,
  photoURL: String,
  privateAccount: {
    type: Boolean,
    default: false,
  },
  dob: Date,
  gender: String,
  phone: { type: String, default: null },
  disabled: { type: Boolean, default: false },
  createdAt: { type: Date, default: new Date() }, 
  phoneVerified: { type: Boolean, default: false },
  emailVerified: { type: Boolean, default: false },
});
