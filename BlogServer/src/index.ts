import http from "http";
import express from "express";
import mongoose from "mongoose";
import connection from "./frameworks/mongoDb/connection";
import getConfigs from "./configs";
import expressConfig from "./frameworks/webserver/express";
import serverConfig from "./frameworks/webserver";
import routes from "./frameworks/webserver/routes";

const app = express();
const server = http.createServer(app);

expressConfig(app, getConfigs);

connection(mongoose, getConfigs).connectToMongodb();

routes(app, express, getConfigs);

serverConfig(server, getConfigs).startServer();
