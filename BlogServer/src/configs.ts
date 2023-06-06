import dotenv from "dotenv";
dotenv.config();

const getConfigs = () => {
  return {
    morgan: {
      logStyle: "dev",
    },
    server: {
      name: "Dynotxt BlogServer",
      port: process.env.PORT || 5003,
      baseURl: "/",
      serverId: "2",
      appBaseUrl: "/blog",
      adminBaseUrl: "/blog/su",
      logoUrl: "https://remintroy.github.io/dynotxt/userClient/public/logo.png",
    },
    jwt: {
      user: process.env.ACCESS_TOKEN_SECRET,
      admin: process.env.ADMIN_ACCESS_TOKEN_SECRET,
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
    rabbitmq: {
      url: process.env.RABBITMQ_URL,
    },
    blog: {
      blogIdLength: 22,
      authorLength: 28,
      title: {
        minChar: 0,
        maxChar: 800,
      },
      subtitle: {
        maxChar: 1000,
      },
    },
    mongo: {
      url: process.env.MONGODB_URL,
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
    aws: {
      accessKeyId: process.env.AWS_S3_ACESS_KEY,
      secretKeyId: process.env.AWS_S3_SECRET_KEY,
      region: process.env.AWS_S3_REGION,
      version: "v4",
      bucketName: process.env.AWS_S3_BUCKET_NAME,
      s3SignedExpires: 60 * 60 * 5,
    },
    email: {
      user: process.env.MAIL_USERID,
      pass: process.env.MAIL_APP_PASSWORD,
    },
    actions: {
      NOTHING: "NTHNG",
      LIKED: "LIKED",
      DISLIKED: "DISLIKED",
    },
  };
};

export default getConfigs;
