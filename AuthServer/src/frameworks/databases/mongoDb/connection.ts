import { Mongoose } from "mongoose";
import getConfigs from "../../../configs";

/* eslint-disable no-console */

export default function connection(
  mongoose: Mongoose,
  configs: typeof getConfigs
) {
  const config = configs();
  const connectToMongodb = () => {
    mongoose
      .connect(config.mongo.url, config.mongo.options)
      .then(
        () => {
          //
        },
        (err) => {
          console.info("Mongodb error", err);
        }
      )
      .catch((err) => {
        console.log("ERROR:", err);
      });
  };

  mongoose.connection.on("connected", () => {
    console.info(
      `[${config.server.serverId}] DB Connected to ${config.mongo.db}`
    );
  });

  mongoose.connection.on("reconnected", () => {
    console.info(`[${config.server.serverId}] MongoDB reconnected!`);
  });

  mongoose.connection.on("error", (error) => {
    console.error(
      `[${config.server.serverId}] Error in MongoDb connection: ${error}`
    );
    mongoose.disconnect();
  });

  mongoose.connection.on("disconnected", () => {
    if (config.mongo.autoReconnect) {
      console.error(
        `[${config.server.serverId}] MongoDB disconnected! Reconnecting in ${
          config.mongo.reconnectInterval / 1000
        }s...`
      );
      setTimeout(() => connectToMongodb(), config.mongo.reconnectInterval);
    }
  });

  return {
    connectToMongodb,
  };
}
