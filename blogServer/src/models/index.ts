import mongoose from "mongoose";
import { appConfig } from "../configs";
import blogModel from "./blog.model";

const config = appConfig();
const connectionURL = config.db.url;
const dbName = config.db.dbName;
const connection = mongoose.connect(connectionURL, { dbName: dbName });

connection
  .then(() => {
    console.log("[] Database conncted to post server");
  })
  .catch((err) => console.log(err));

export default { blogModel };
