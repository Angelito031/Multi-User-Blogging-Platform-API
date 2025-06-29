import express from "express";
import {
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

export default UserRoutes;
