import { createServer } from "http";
import { Server } from "socket.io";
import serverConfig from "./frameworks/http-server";
import getConfigs from "./configs";
import socketSetup from "./frameworks/socket.io";

const config = getConfigs();
const server = createServer();
const io = new Server(server, {
  path: config.server.baseURl,
  cors: config.cors,
});
socketSetup(io);
serverConfig(server, getConfigs).startServer();
