/**
 * This class gives you connection methords for mongodb using mongoose
 */
export default class GetMongo {
  private mongoose: any;
  private serverConfigs: any;

  constructor(mongoose: any, serverConfigs: any) {
    this.mongoose = mongoose;
    const serverConfigsObj = serverConfigs();
    this.serverConfigs = serverConfigsObj;
    const connectToMongodb = this.connectToMongodb;

    // setting up event handlers and listeners
    mongoose.connection.on("connected", onConnected);
    mongoose.connection.on("reconnected", onReConnected);
    mongoose.connection.on("error", onError);
    mongoose.connection.on("disconnected", onDisconnect);

    function onConnected() {
      console.info(`[${serverConfigsObj?.server?.serverId}] DB Connected to ${serverConfigsObj?.mongo?.db}`);
    }

    function onReConnected() {
      console.info(`[${serverConfigsObj?.server?.serverId}] MongoDB reconnected!`);
    }

    function onError(error: any) {
      console.error(`[${serverConfigsObj?.server?.serverId}] Error in MongoDb connection: `, error);
      mongoose.disconnect();
    }

    function onDisconnect() {
      if (serverConfigsObj?.mongo?.autoReconnect) {
        console.error(
          `[${serverConfigsObj?.server?.serverId}] MongoDB disconnected! Reconnecting in ${
            serverConfigsObj?.mongo?.reconnectInterval / 1000
          }s...`
        );
        setTimeout(() => connectToMongodb(), serverConfigsObj?.mongo?.reconnectInterval);
      }
    }
  }

  /**
   * Connect mongose to mongodb
   */
  connectToMongodb() {
    this.mongoose
      .connect(this.serverConfigs?.mongo?.url)
      .then(
        () => {},
        (err: any) => {
          console.info("Mongodb error", err);
        }
      )
      .catch((err: any) => {
        console.log("ERROR AT MONGO:", err);
      });
  }
}
