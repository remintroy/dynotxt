import express from "express";
import http from "http";
import mongoose from "mongoose";
import serverConfig from "./frameworks/webserver";
import connection from "./frameworks/databases/mongoDb/connection";
import expressConfig from "./frameworks/webserver/express";
import getConfigs from "./configs";
import { initializeFirebase } from "./frameworks/services/authServices/firebase";
import routes from "./frameworks/webserver/routes";
import errorHandlingMiddlware from "./frameworks/webserver/middleware/errorHandlingMiddlware";

const app = express();

const server = http.createServer(app);

expressConfig(app, getConfigs);

connection(mongoose, getConfigs).connectToMongodb();

initializeFirebase();

routes(app, express, getConfigs);

app.use(errorHandlingMiddlware);

serverConfig(server, getConfigs).startServer();
