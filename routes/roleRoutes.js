import express from "express";
import {
  CreateRole,
  DeleteAllRoles,
  DeleteRoleById,
  GetAllRoles,
  GetRoleById,
  UpdateRole,
} from "../controllers/roleControllers.js";

const RoleRoutes = express.Router();

RoleRoutes.route("/").get(GetAllRoles).post(CreateRole).delete(DeleteAllRoles);
RoleRoutes.route("/:id")
  .get(GetRoleById)
  .put(UpdateRole)
  .delete(DeleteRoleById);

export default RoleRoutes;
