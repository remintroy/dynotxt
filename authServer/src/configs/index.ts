import dotenv from "dotenv";

dotenv.config();

export const serverConfig = () => {
  return {
    name: "Dynotxt AuthServer",
    port: process.env.PORT || 5001,
    baseURl: "/",
    serverId: "1",
    cors: {
      origin: ["*", "http://localhost:3000"],
      credentials: true,
    },
    appBaseUrl: "/auth",
    adminBaseUrl: "/auth/su",
  };
};

export const appConfig = () => {
  return {
    name: "Auth-UserApp",
    refreshTokenExpires: "365d",
    accessTokenExires: "20m",
    refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
    accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
    mongoDbUrl: process.env.MONGODB_URL,
  };
};

export const adminAppConfig = () => {
  return {
    name: "Auth-AdminApp",
    refreshTokenExpires: "1d",
    accessTokenExires: "20m",
    refreshTokenSecret: process.env.ADMIN_REFRESH_TOKEN_SECRET,
    accessTokenSecret: process.env.ADMIN_ACCESS_TOKEN_SECRET,
    mongoDbUrl: process.env.MONGODB_URL,
  };
};
