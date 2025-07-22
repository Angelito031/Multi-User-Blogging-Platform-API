import express from "express";
import { isAuthenticated, isRoleAllowed } from "../middleware/auth.js";
import {
  CreateComment,
  DeleteAllComments,
  DeleteCommentById,
  GetAllComments,
  UpdateComment,
} from "../controllers/commentController.js";

const CommentRoutes = express.Router();

CommentRoutes.route("/")
  .get(
    isAuthenticated,
    isRoleAllowed("admin", "editor", "reader"),
    GetAllComments
  )
  .post(
    isAuthenticated,
    isRoleAllowed("admin", "editor", "reader"),
    CreateComment
  )
  .delete(isAuthenticated, isRoleAllowed("admin"), DeleteAllComments);

CommentRoutes.route("/:id")
  .put(
    isAuthenticated,
    isRoleAllowed("admin", "editor", "reader"),
    UpdateComment
  )
  .delete(
    isAuthenticated,
    isRoleAllowed("admin", "editor", "reader"),
    DeleteCommentById
  );

export default CommentRoutes;
