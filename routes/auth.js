import express from "express";
import {
  Authenticate,
  logout,
  RefreshUserToken,
} from "../controllers/authController.js";

const AuthRoutes = express.Router();

AuthRoutes.route("/login").post(Authenticate);
AuthRoutes.route("/refresh").post(RefreshUserToken);
AuthRoutes.route("/logout").post(logout);

export default AuthRoutes;
