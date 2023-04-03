import express from "express";
import { signInUser } from "./controller";

const app = express.Router();

app.post("/signin", signInUser);

export default app;
