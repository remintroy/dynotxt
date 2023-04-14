export const appConfig = () => {
  return {
    db: {
      url: process.env.MONGODB_URL,
      dbName: process.env.MONGODB_NAME,
    },
  };
};
