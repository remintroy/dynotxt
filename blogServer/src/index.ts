import express from "express";
import logger from "morgan";
import { appConfig } from "./configs";
import userRouter from "./routes/user.routes";
import adminRouter from "./routes/admin.routes";
import { mongoInit } from "./models";

const server = express();
const config = appConfig();

mongoInit()

server.use(logger("dev"));
server.use(express.json());

server.use(config.server.baseUrl, userRouter);
server.use(config.server.baseUrlAdmin, adminRouter);

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
