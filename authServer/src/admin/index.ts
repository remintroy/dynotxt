import express from "express";
import { getUserData, userSignIn } from "./controller";
import { authInit, mustLoginAsUser } from "./middleware";
import client from "./client";

const admin = express.Router();

admin.use(authInit);

admin.post("/signin", userSignIn);
admin.use("/user_data", getUserData);

// user manipulation codes are in client router
admin.use("/user", mustLoginAsUser, client);

export default admin;
