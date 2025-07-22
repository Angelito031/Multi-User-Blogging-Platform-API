import dotenv from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";
import AuthRoutes from "./routes/auth.js";
import UserRoutes from "./routes/userRoutes.js";
import RoleRoutes from "./routes/roleRoutes.js";
import BlogRoutes from "./routes/blogRoutes.js";
import CommentRoutes from "./routes/commentRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//Routes endpoint
app.use("/api/auth", AuthRoutes);
app.use("/api/users", UserRoutes);
app.use("/api/roles", RoleRoutes);
app.use("/api/blogs", BlogRoutes);
app.use("/api/comments", CommentRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
