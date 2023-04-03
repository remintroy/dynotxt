import dotenv from "dotenv";
import express from "express";
import logger from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import app from "./app";
import { serverConfig } from "./configs/";
import admin from "./admin";
import services from "./services";

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
  console.log(`[${config.serverId}] ${config.name} listening on ${config.port}`);
});
