import express from "express";
import http from "http";
import mongoose from "mongoose";
import serverConfig from "./frameworks/webserver";
import expressConfig from "./frameworks/webserver/express";
import getConfigs from "./configs";
import { initializeFirebase } from "./frameworks/services/authServices/firebase";
import routes from "./frameworks/webserver/routes";
import GetMongo from "dynotxt-common-services/build/mongodb";
import GetExpress from "dynotxt-common-services/build/express";

const expressService = new GetExpress();

const app = express();

const server = http.createServer(app);

expressConfig(app, getConfigs);

new GetMongo(mongoose, getConfigs).connectToMongodb();

initializeFirebase();

routes(app, express, getConfigs);

app.use(expressService.errorHandlingMiddleWare);

serverConfig(server, getConfigs).startServer();
