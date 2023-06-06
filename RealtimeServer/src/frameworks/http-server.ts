import getConfigs from "../configs";
import { createServer } from "http";

export default function serverConfig(server: ReturnType<typeof createServer>, config: typeof getConfigs) {
  const startServer = () => {
    const configData = config();
    server.listen(configData.server.port, () => {
      console.log(`[${configData.server.serverId}] ${configData.server.name} is started on ${configData.server.port}`);
    });
  };

  return {
    startServer,
  };
}
