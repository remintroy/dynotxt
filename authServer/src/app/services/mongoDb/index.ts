// import mongoosePaginator from "mongoose-paginate-v2";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { appConfig, serverConfig } from "../../../configs";
import { IRefreshToken, IUser, refreshTokenSchema, userSchema } from "./schema";
import colors from "colors/safe";

dotenv.config();
const config = appConfig();
const server = serverConfig();

const dbLatencyLoggerTime = Date.now();
const dbLatencyLogger = () => {
  const { colors: color, serverId } = server;
  const { name } = config;
  //
  const serverID = colors[color.serverIdColor](`[${server.serverId}]`);
  const mainLog = colors[color.mainLogColor](`${name} database in ${Date.now() - dbLatencyLoggerTime}ms`);
  //
  console.log(`${serverID} ${mainLog}`);
};

const db = mongoose.createConnection(config.mongoDbUrl);

db.on("error", (error) => console.error(error));
db.once("open", () => dbLatencyLogger());

export const usersModel = db.model<IUser>("users", userSchema);
export const refreshTokensModel = db.model<IRefreshToken>("refreshTokens", refreshTokenSchema);
