import dotenv from "dotenv";
dotenv.config();

export const appConfig = () => {
  return {
    db: {
      url: process.env.MONGODB_URL,
      dbName: process.env.MONGODB_NAME,
    },
    email: {
      user: process.env.MAIL_USERID,
      pass: process.env.MAIL_PASSWORD,
    },
    server: {
      id: 2,
      name: "Dynotxt BlogServer",
      baseUrl: "/blog",
      baseUrlAdmin: "/blog/su",
      port: process.env.PORT || 5003,
    },
    id: {
      length: 22,
      minLen: 22,
      maxLen: 22,
      pattern: "A0",
    },
    jwt: {
      userSecret: process.env.ACCESS_TOKEN_SECRET,
    },
  };
};
