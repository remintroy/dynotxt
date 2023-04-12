import dotenv from "dotenv";

dotenv.config();

export const serverConfig = () => {
  return {
    name: "Dynotxt AuthServer",
    port: process.env.PORT || 5001,
    baseURl: "/",
    serverId: "1",
    cors: {
      origin: ["*", "https://dynotxt.com", "https://admin.dynotxt.com"],
      credentials: true,
    },
    appBaseUrl: "/auth",
    adminBaseUrl: "/auth/su",
    colors: {
      serverIdColor: "yellow",
      mainLogColor: "white",
    },
    db: {
      url: process.env.MONGODB_URL, // both app use same db
    },
    email: {
      user: process.env.MAIL_USERID,
      pass: process.env.MAIL_APP_PASSWORD,
    },
  };
};

export const appConfig = () => {
  return {
    name: "Auth-UserApp",
    jwt: {
      refreshTokenExpires: "365d",
      accessTokenExires: "20m",
      refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
      accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
    },
  };
};

export const adminAppConfig = () => {
  return {
    name: "Auth-AdminApp",
    auth: {
      minPasswordLength: 6,
      minPhoneLength: 10,
      minNameLength: 2,
    },
    jwt: {
      refreshTokenExpires: "1d",
      accessTokenExires: "20m",
      refreshTokenSecret: process.env.ADMIN_REFRESH_TOKEN_SECRET,
      accessTokenSecret: process.env.ADMIN_ACCESS_TOKEN_SECRET,
    },
    db: {
      paginate: {
        limit: 10,
      },
      userProjection: {
        _id: 0,
        uid: 1,
        email: 1,
        name: 1,
        phone: 1,
        disabled: 1,
        photoURL: 1,
      },
    },
  };
};
