import express from "express";
import { isAuthenticated, isRoleAllowed } from "../middleware/auth.js";
import { GetAllBlogs, GetBlogById } from "../controllers/blogController.js";

const BlogRoutes = express.Router();

BlogRoutes.route("/")
  .get(isAuthenticated, isRoleAllowed("admin", "editor", "reader"), GetAllBlogs)
  .post(isAuthenticated, isRoleAllowed("admin", "editor"))
  .delete(isAuthenticated, isRoleAllowed("admin", "editor"));

BlogRoutes.route("/:id")
  .get(isAuthenticated, isRoleAllowed("admin", "editor", "reader"), GetBlogById)
  .put(isAuthenticated, isRoleAllowed("admin", "editor"))
  .delete(isAuthenticated, isRoleAllowed("admin", "editor"));

export default BlogRoutes;
