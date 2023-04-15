import express from "express";
import { crateExpressCallback } from "./express.callback";
import { getFetchBlogById } from "../controllers/user.controller";

export const app = express.Router();

app.get("/posts/:id", crateExpressCallback(getFetchBlogById));

export default app;
