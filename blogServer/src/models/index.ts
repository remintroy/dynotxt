import mongoose from "mongoose";
import { appConfig } from "../configs";
import blogModel from "./blog.model";
import userModel from "./user.model";

const config = appConfig();
const connectionURL = config.db.url;
const dbName = config.db.dbName;
const connection = mongoose.connect(connectionURL, { dbName: dbName });

connection
  .then(() => { 
    console.log(`[${config.server.id}] Database conncted to ${config.db.dbName}`);
  })
  .catch((err) => console.log(err));

export default { blogModel, userModel }; 

export const mongoInit = () => {}
