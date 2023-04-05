import express from "express";
import { userSignIn } from "./controller";
import { authInit, mustLoginAsUser } from "./middleware";
import client from "./client";
import { createError } from "../utils";

const admin = express.Router();

admin.use(authInit);

admin.post("/signin", userSignIn);

// user manipulation codes are in client router
// TODO : Add login check - mustLoginAsUser
admin.use("/user", client); 

export default admin;
