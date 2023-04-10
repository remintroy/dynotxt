import express from "express";
import { getNewAccessToken, getUserData, logoutUser, signInUser, updateUserData } from "./controller";
import { authInit, mustLoginAsUser } from "./middlewares";

const app = express.Router();

app.use(authInit);

app.get("/user_data", getUserData);
app.get("/refresh", getNewAccessToken);
app.get("/logout", mustLoginAsUser, logoutUser);
app.post("/signin", signInUser);
app.post("/update_user_data", mustLoginAsUser, updateUserData);

export default app;
