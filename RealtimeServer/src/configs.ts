import dotenv from "dotenv";
dotenv.config();

const getConfigs = () => {
  return {
    server: {
      name: "Dynotxt RealtimeServer",
      port: process.env.PORT || 5004,
      baseURl: "/real",
      serverId: "3",
      logoUrl: "https://remintroy.github.io/dynotxt/userClient/public/logo.png",
    },
    jwt: {
      user: process.env.ACCESS_TOKEN_SECRET,
      admin: process.env.ADMIN_ACCESS_TOKEN_SECRET,
    },
    cors: {
      origin: ["https://dynotxt.com", "https://admin.dynotxt.com"],
      credentials: true,
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
    actions: {},
  };
};

export default getConfigs;
