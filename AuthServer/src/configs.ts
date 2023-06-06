import dotenv from "dotenv";

dotenv.config();

const getConfigs = () => {
  return {
    morgan: {
      logStyle: "dev",
    },
    server: {
      name: "Dynotxt AuthServer",
      port: process.env.PORT || 5001,
      baseURl: "/",
      serverId: "1",
      appBaseUrl: "/auth",
      adminBaseUrl: "/auth/su",
      logoUrl: "https://remintroy.github.io/dynotxt/userClient/public/logo.png",
    },
    bcrypt: {
      salt: 10,
    },
    jwt: {
      user: {
        accessSecret: process.env.ACCESS_TOKEN_SECRET,
        refreshSecret: process.env.REFRESH_TOKEN_SECRET,
        accessOptions: {
          expiresIn: "25m",
        },
        refreshOptions: {
          expiresIn: "365d",
        },
      },
      admin: {
        refreshSecret: process.env.ADMIN_REFRESH_TOKEN_SECRET,
        accessSecret: process.env.ADMIN_ACCESS_TOKEN_SECRET,
        accessOptions: {
          expiresIn: "15m",
        },
        refreshOptions: {
          expiresIn: "1d",
        },
      },
    },
    rabbitmq: {
      url: process.env.RABBITMQ_URL,
    },
    cors: {
      origin: [
        "*",
        "https://dynotxt.com",
        "https://admin.dynotxt.com",
        "https://master.dynotxt.pages.dev",
        "https://dynotxt.pages.dev",
      ],
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
      VERIFY_EMAIL_AT_SIGNIN: "VRFYMIL",
      REDIRECT_TO_HOME: "BTHOME",
      VERIFIED: "VERIFIED",
      NOT_VERIFIED: "NVERIFIED",
      FOLLOWED: "FOLLOWED",
      FOLLOW_REQUESTED: "FOLLOWREQ",
      NOT_FOLLOWING: "NOTFOLLOWING",
    },
  };
};

export default getConfigs;
