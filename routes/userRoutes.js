import express from "express";
import {
  ChangePassword,
  CreateUser,
  DeleteAllUsers,
  DeleteUserById,
  GetAllUsers,
  GetUserById,
  UpdateUser,
} from "../controllers/userControllers.js";
import { isAuthenticated, isRoleAllowed } from "../middleware/auth.js";

const UserRoutes = express.Router();

UserRoutes.route("/")
  .get(isAuthenticated, isRoleAllowed("admin", "editor"), GetAllUsers)
  .post(CreateUser)
  .delete(isAuthenticated, isRoleAllowed("admin"), DeleteAllUsers);
UserRoutes.route("/:id")
  .get(isAuthenticated, isRoleAllowed("admin", "editor", "reader"), GetUserById)
  .put(isAuthenticated, isRoleAllowed("admin"), UpdateUser)
  .delete(
    isAuthenticated,
    isRoleAllowed("admin", "editor", "reader"),
    DeleteUserById
  );

UserRoutes.route("/changepass/:id").post(ChangePassword);

export default UserRoutes;
