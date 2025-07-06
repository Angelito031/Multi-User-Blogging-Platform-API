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

const UserRoutes = express.Router();

UserRoutes.route("/").get(GetAllUsers).post(CreateUser).delete(DeleteAllUsers);
UserRoutes.route("/:id")
  .get(GetUserById)
  .put(UpdateUser)
  .delete(DeleteUserById);

UserRoutes.route("/changepass/:id").post(ChangePassword);

export default UserRoutes;
