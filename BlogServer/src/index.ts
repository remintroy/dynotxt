import http from "http";
import express from "express";
import mongoose from "mongoose";
import getConfigs from "./configs";
import expressConfig from "./frameworks/webserver/express";
import serverConfig from "./frameworks/webserver";
import routes from "./frameworks/webserver/routes";
import GetMongo from "dynotxt-common-services/build/mongodb";

const app = express();

const server = http.createServer(app);

expressConfig(app, getConfigs);

new GetMongo(mongoose, getConfigs).connectToMongodb();

routes(app, express, getConfigs);

serverConfig(server, getConfigs).startServer();
