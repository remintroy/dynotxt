import express from "express";
import { disableUser, enableUser, getAllUsersData  } from "./controller";

const client = express.Router();

client.get("/get/", getAllUsersData);
client.put("/disable/:uid", disableUser);
client.put("/enable/:uid", enableUser);

export default client;
