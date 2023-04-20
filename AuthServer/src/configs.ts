import dotenv from "dotenv";
dotenv.config();

export const getConfigs = () => {
  return {
    server: {
      name: "Dynotxt AuthServer",
      port: process.env.PORT || 5001,
      baseURl: "/",
      serverId: "1",
      appBaseUrl: "/auth",
      adminBaseUrl: "/auth/su",
      logoUrl: "https://remintroy.github.io/dynotxt/userClient/public/logo.png",
    },
    jwt: {
      adminAccessSecret: process.env.ADMIN_ACCESS_TOKEN_SECRET,
      adminRefreshSecret: process.env.ADMIN_REFRESH_TOKEN_SECRET,
      userAccessSecret: process.env.ACCESS_TOKEN_SECRET,
      userRefreshSecret: process.env.REFRESH_TOKEN_SECRET,
    },
    cors: {
      origin: ["*", "https://dynotxt.com", "https://admin.dynotxt.com"],
      credentials: true,
    },
    colors: {
      serverIdColor: "yellow",
      mainLogColor: "white",
    },
    mongo: {
      url: process.env.MONGODB_URL, // both app use same db
      reconnectInterval: 10000,
      autoReconnect: true,
      db: process.env.MONGODB_NAME,
      options: {
        autoIndex: false,
        useNewUrlParser: true,
        keepAlive: true,
        connectTimeoutMS: 1000,
      },
    },
    email: {
      user: process.env.MAIL_USERID,
      pass: process.env.MAIL_APP_PASSWORD,
    },
    actions: {
      VERIFY_EMAIL_AT_SIGNIN: "verify-email-at-signup",
    },
  };
};
