import mongoose from "mongoose";
import paginate from "mongoose-paginate-v2";
import dotenv from "dotenv";
import colors from "colors/safe";
import { IAdminRefreshToken, IAdminUser, IOtp, IRefreshToken, IUser } from "./types";
import { adminRefreshTokenSchema, adminUserSchema, otpSchema, refreshTokenSchema, userSchema } from "./schema";
import { adminAppConfig, appConfig, serverConfig } from "../../configs";

dotenv.config();

const config = adminAppConfig();
const server = serverConfig();
const app = appConfig();

const dbLatencyLoggerTime = Date.now();
const dbLatencyLogger = () => {
  const { colors: color, serverId } = server;
  //
  const serverID = colors[color.serverIdColor](`[${serverId}]`);
  const mainLog = colors[color.mainLogColor](`${config.name},${app.name} database in ${Date.now() - dbLatencyLoggerTime}ms`);
  //
  console.log(`${serverID} ${mainLog}`);
};

const db = mongoose.connect(server.db.url);

db.then((value) => {
  dbLatencyLogger();
}).catch((error) => {
  console.error(error);
});

// PLUGINS
userSchema.plugin(paginate);

export const adminUsersModel = mongoose.model<IAdminUser>("adminUser", adminUserSchema);
export const adminRefreshTokensModel = mongoose.model<IAdminRefreshToken>("adminRefreshTokens", adminRefreshTokenSchema);
export const usersModel = mongoose.model<IUser, mongoose.PaginateModel<IUser>>("users", userSchema);
export const refreshTokensModel = mongoose.model<IRefreshToken>("refreshTokens", refreshTokenSchema);
export const otpModel = mongoose.model<IOtp>("otps", otpSchema);
