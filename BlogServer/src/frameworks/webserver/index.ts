import getConfigs from "../../configs";

export default function serverConfig(server: any, config: typeof getConfigs) {
  const startServer = () => {
    const configData = config();
    server.listen(configData.server.port, () => {
      console.log(
        `[${configData.server.serverId}] ${configData.server.name} is started on ${configData.server.port}`
      );
    });
  };

  return {
    startServer,
  };
}
