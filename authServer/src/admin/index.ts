import express from "express";
import { userSignIn } from "./controller";

const admin = express.Router();

admin.post("/signin", userSignIn);

export default admin;
