import http from "http";
import express from "express";
import mongoose from "mongoose";
import expressConfig from "./frameworks/webserver/express";
import getConfigs from "./configs";
import connection from "./frameworks/database/mongoDb/connection";
import errorHandlingMiddlware from "./frameworks/webserver/middlewares/errorHandlingMiddlware";
import serverConfig from "./frameworks/webserver";
import routes from "./frameworks/webserver/routes";

const app = express();

const server = http.createServer(app);

expressConfig(app, getConfigs);

connection(mongoose, getConfigs).connectToMongodb();

routes(app, express, getConfigs);

app.use(errorHandlingMiddlware);

serverConfig(server, getConfigs).startServer();
