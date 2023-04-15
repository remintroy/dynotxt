import express from "express";
import logger from "morgan";
import { appConfig } from "./configs";

const server = express();
const config = appConfig();

server.use(logger("dev"));
server.use(express.json());

server.use((req, res) => {
  res.status(404).send({
    code: 404,
    message: "Not found",
    error: `${config.server.name}, The service you are looking for is not available on this server`,
  });
});

server.listen(config.server.port, () => {
  console.log(`[${config.server.id}] ${config.server.name} Started on port ${config.server.port}`);
});
