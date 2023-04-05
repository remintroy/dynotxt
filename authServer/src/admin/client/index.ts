import express from "express";
import { disableUser, enableUser, getUsersData } from "./controller";

const client = express.Router();

client.get("/get/:uid", getUsersData);
client.put("/disable/:uid", disableUser);
client.put("/enable/:uid", enableUser);

export default client;
