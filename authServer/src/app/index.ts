import express from "express";
import {
  getNewAccessToken,
  getUserData,
  logoutUser,
  signInUser,
  updateUserData,
  verifyEmailForAuth,
  verifyEmailPageAuth,
} from "./controller";
import { authInit, mustLoginAsUser } from "./middlewares";

const app = express.Router();

app.use(authInit);

app.post("/signin", signInUser);
app.get("/refresh", getNewAccessToken);
app.get("/logout", mustLoginAsUser, logoutUser);
app.post("/update_user_data", mustLoginAsUser, updateUserData);
app.get("/user_data", getUserData);
app.post("/verify_email", verifyEmailForAuth);
app.get("/verify_email_page/:uid", verifyEmailPageAuth);


export default app;
