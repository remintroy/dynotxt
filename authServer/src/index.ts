import dotenv from "dotenv";
import express from "express";
import logger from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import app from "./app";
import { serverConfig } from "./configs/";
import admin from "./admin";
import services from "./services";
import colors from "colors/safe";

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

// test reponse
server.use((req, res) => res.send({ name: config.name }));

// starts server
server.listen(config.port, () => {
  const { colors: color, port, name, serverId } = config;
  //
  const serverID = colors[color.serverIdColor](`[${serverId}]`);
  const mainLog = colors[color.mainLogColor](`${name} listening on ${port}`);
  //
  console.log(`${serverID} ${mainLog}`);
});
