import dotenv from "dotenv";
import express from "express";
import UserRoutes from "./routes/userRoutes.js";
import RoleRoutes from "./routes/roleRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());

app.use("/api/users", UserRoutes);
app.use("/api/roles", RoleRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
