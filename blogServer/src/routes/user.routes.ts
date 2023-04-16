import express from "express";
import { createExpressCallback } from "./express.callback";
import { deleteBlogData, getFetchBlogById, postCreateNewBlog, putUpdateBlogData } from "../controllers/user.controller";
import { authInit, mustLogin } from "./middlewares";

export const app = express.Router();

app.use(authInit);

app.get("/post/:id", createExpressCallback(getFetchBlogById));
app.post("/post/create", mustLogin, createExpressCallback(postCreateNewBlog));
app.put("/post/:id", mustLogin, createExpressCallback(putUpdateBlogData));
app.delete("/post/:id", mustLogin, createExpressCallback(deleteBlogData));

export default app;
