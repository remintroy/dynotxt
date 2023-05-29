import { createServer } from "http";
import { Server } from "socket.io";
import serverConfig from "./frameworks/http-server";
import getConfigs from "./configs";
import socketSetup from "./frameworks/socket.io";
import GetMongo from "dynotxt-common-services/build/mongodb";
import mongoose from "mongoose";

const config = getConfigs();
const server = createServer();
const io = new Server(server, {
  path: config.server.baseURl,
  cors: config.cors,
});
socketSetup(io);
new GetMongo(mongoose, getConfigs).connectToMongodb();
serverConfig(server, getConfigs).startServer();
