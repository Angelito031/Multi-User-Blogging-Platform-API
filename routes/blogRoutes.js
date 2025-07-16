import express from "express";
import { isAuthenticated, isRoleAllowed } from "../middleware/auth.js";
import {
  CreateBlogPost,
  DeleteAllBlogs,
  DeleteBlogPost,
  GetAllBlogs,
  GetBlogById,
  UpdateBlogPost,
} from "../controllers/blogController.js";

const BlogRoutes = express.Router();

BlogRoutes.route("/")
  .get(isAuthenticated, isRoleAllowed("admin", "editor", "reader"), GetAllBlogs)
  .post(isAuthenticated, isRoleAllowed("admin", "editor"), CreateBlogPost)
  .delete(isAuthenticated, isRoleAllowed("admin", "editor"), DeleteAllBlogs);

BlogRoutes.route("/:id")
  .get(isAuthenticated, isRoleAllowed("admin", "editor", "reader"), GetBlogById)
  .put(isAuthenticated, isRoleAllowed("admin", "editor"), UpdateBlogPost)
  .delete(isAuthenticated, isRoleAllowed("admin", "editor"), DeleteBlogPost);

export default BlogRoutes;
