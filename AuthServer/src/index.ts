import express from "express";
import http from "http";
import serverConfig from "./frameworks/webserver";
import connection from "./frameworks/databases/mongoDb/connection";
import mongoose from "mongoose";
import expressConfig from "./frameworks/webserver/express";
import { getConfigs } from "./configs";
import { initializeFirebase } from "./frameworks/services/authServices/firebase";
import routes from "./frameworks/webserver/routes";
import errorHandlingMiddlware from "./frameworks/webserver/middleware/errorHandlingMiddlware";

const app = express();

const server = http.createServer(app);

serverConfig(server, getConfigs).startServer();

expressConfig(app, getConfigs);

connection(mongoose, getConfigs).connectToMongodb();

initializeFirebase();

routes(app, express, getConfigs);

app.use(errorHandlingMiddlware);
