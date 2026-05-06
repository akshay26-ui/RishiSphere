import express from "express";
import userRoutes from "./modules/users/user.routes.js";

const app = express();

app.use(express.json());

app.use("/api/users", userRoutes);


app.listen(3000, () => {
  console.log("Server running on port 3000");
});
