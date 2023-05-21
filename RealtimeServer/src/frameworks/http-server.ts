import getConfigs from "../configs";
import { createServer } from "http";

export default function serverConfig(server: ReturnType<typeof createServer>, config: typeof getConfigs) {
  const startServer = () => {
    const configData = config();
    server.on("request", (req, res) => {
      // res.statusCode = 404;
      // res.end(
      //   JSON.stringify({ status: 400, message: "the service you are looking for is not available in this server" })
      // );
    });
    server.listen(configData.server.port, () => {
      console.log(`[${configData.server.serverId}] ${configData.server.name} is started on ${configData.server.port}`);
    });
  };

  return {
    startServer,
  };
}
