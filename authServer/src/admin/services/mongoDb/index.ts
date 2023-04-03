// import mongoosePaginator from "mongoose-paginate-v2";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { adminAppConfig, serverConfig } from "../../../configs";
import { IRefreshToken, IUser, refreshTokenSchema, userSchema } from "./schema";

dotenv.config();

const config = adminAppConfig();
const server = serverConfig();

const dbLatencyLoggerTime = Date.now();
const dbLatencyLogger = () =>
  console.log(`[${server.serverId}] ${server.name} database in ${Date.now() - dbLatencyLoggerTime}ms`);

const db = mongoose.createConnection(config.mongoDbUrl);

db.on("error", (error) => console.error(error));
db.once("open", () => dbLatencyLogger());

export const usersModel = db.model<IUser>("users", userSchema);
export const refreshTokensModel = db.model<IRefreshToken>("refreshTokens", refreshTokenSchema);

