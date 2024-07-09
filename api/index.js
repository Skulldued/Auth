import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "../routes/user.route.js";
import authRoutes from "../routes/auth.route.js";
dotenv.config();
mongoose
  .connect(process.env.MONGODBURI)
  .then(() => {
    console.log("Connected to database");
  })
  .catch((error) => {
    console.log(error);
  });

const app = express();
app.use(express.json());

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`SERVER RUNNING ON PORT ${PORT}`);
});

app.use("/api/user", userRoutes);
app.use("/api/auth",authRoutes);
