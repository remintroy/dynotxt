import dotenv from "dotenv";
import express from "express";
import logger from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import app from "./app.js";
import { appConfig } from "./configs/";
import { authInit } from "./app/middlewares";

dotenv.config();

const config = appConfig();
const server = express();

server.use(logger("dev"));
server.use(cors());
server.use(express.json());
server.use(cookieParser());
server.use(authInit);

// connecting app router to baseUrl
server.use(config.baseUrl, app);

// test reponse
server.use((req, res) => res.send({ name: config.name }));

// starts server
server.listen(config.port, () => {
  console.log(`[${config.serverId}] ${config.name} listening on ${config.port}`);
});
