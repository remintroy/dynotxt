import { createServer } from "http";
import { Server } from "socket.io";
import serverConfig from "./frameworks/http-server";
import getConfigs from "./configs";
import socketSetup from "./frameworks/socket.io";
import GetMongo from "dynotxt-common-services/build/mongodb";
import mongoose from "mongoose";
import connectRabbitMQ from "./frameworks/rabbitmq";
import EventEmitter from "events";

const config = getConfigs();
export const events = new EventEmitter();
const server = createServer();
const io = new Server(server, {
  path: config.server.baseURl,
  cors: config.cors,
});

socketSetup(io, events);

connectRabbitMQ(events);

new GetMongo(mongoose, getConfigs).connectToMongodb();

serverConfig(server, getConfigs).startServer();
