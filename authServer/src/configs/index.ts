import dotenv from "dotenv";

dotenv.config();

export const appConfig = () => {
  return {
    name: "Dynotxt AuthServer",
    port: process.env.PORT || 5001,
    baseUrl: "/auth",
    serverId: "1",
    refreshTokenExpires: "365d",
    accessTokenExires: "20m",
    refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
    accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
    mongoDbUrl: process.env.MONGODB_URL,
  };
};
