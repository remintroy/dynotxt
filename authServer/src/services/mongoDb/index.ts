import mongoose from "mongoose";
import paginate from "mongoose-paginate-v2";
import dotenv from "dotenv";
import colors from "colors/safe";
import { IAdminRefreshToken, IAdminUser, IRefreshToken, IUser } from "./defenition";
import { adminRefreshTokenSchema, adminUserSchema, refreshTokenSchema, userSchema } from "./schema";
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

const db = mongoose.createConnection(server.db.url);

db.on("error", (error) => console.error(error));
db.once("open", () => dbLatencyLogger());

// PLUGINS
userSchema.plugin(paginate);

export const adminUsersModel = db.model<IAdminUser>("adminUser", adminUserSchema);
export const adminRefreshTokensModel = db.model<IAdminRefreshToken>("adminRefreshTokens", adminRefreshTokenSchema);
export const usersModel = db.model<IUser, mongoose.PaginateModel<IUser>>("users", userSchema);
export const refreshTokensModel = db.model<IRefreshToken>("refreshTokens", refreshTokenSchema);
