import dotenv from "dotenv";
import express from "express";
import logger from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import app from "./app/";
import admin from "./admin";
import services from "./services";
import colors from "colors/safe";
import { serverConfig } from "./configs";
import { createError } from "./utils";

dotenv.config();
services.config();

const config = serverConfig();
const server = express();

server.use(logger("dev"));
server.use(cors(config.cors));
server.use(express.json());
server.use(cookieParser());

// connecting app router to baseUrl
server.use(config.appBaseUrl, app);
server.use(config.adminBaseUrl, admin);

// 404 reponse
server.use((req, res) => {
  const error = createError(404, `${config.name}, The service you are looking for is not available on this server`);
  res.status(error.code).send(error);
});

// starts server
server.listen(config.port, () => {
  const { colors: color, port, name, serverId } = config;
  //
  const serverID = colors[color.serverIdColor](`[${serverId}]`);
  const mainLog = colors[color.mainLogColor](`${name} listening on ${port}`);
  //
  console.log(`${serverID} ${mainLog}`);
});
