import mongoose from "mongoose";
import dotenv from "dotenv";
// import mongoosePaginator from "mongoose-paginate-v2";
import { appConfig } from "../configs";

dotenv.config();
const config = appConfig();

const dbLatencyLoggerTime = Date.now();
const dbLatencyLogger = () =>
  console.log(`[${config.serverId}] ${config.name} Database connected in : ${Date.now() - dbLatencyLoggerTime}ms`);

const db = mongoose.createConnection(config.mongoDbUrl);

db.on("error", (error) => console.error(error));
db.once("open", () => dbLatencyLogger());

// users schema
export const users = db.model(
  "users",
  new mongoose.Schema({
    name: String,
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
  })
);

// to save refresh tokens
export const refreshTokens = db.model(
  "refreshTokens",
  new mongoose.Schema({
    value: String,
    uid: String,
    createdAt: {
      type: Date,
      default: new Date(),
    },
  })
);
