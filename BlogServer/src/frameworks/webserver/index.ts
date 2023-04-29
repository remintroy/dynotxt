import getConfigs from "../../configs";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function serverConfig(server: any, config: typeof getConfigs) {
  const startServer = () => {
    const configData = config();

    server.listen(configData.server.port, () => {
      // eslint-disable-next-line no-console
      console.log(
        `[${configData.server.serverId}] ${configData.server.name} is started on ${configData.server.port}`
      );
    });
  };

  return {
    startServer,
  };
}
