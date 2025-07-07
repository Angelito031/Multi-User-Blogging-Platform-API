import express from "express";
import { GetAllRoles } from "../controllers/roleControllers.js";
import { isAuthenticated, isRoleAllowed } from "../middleware/auth.js";

const RoleRoutes = express.Router();

RoleRoutes.route("/").get(isAuthenticated, isRoleAllowed("admin"), GetAllRoles);
export default RoleRoutes;
