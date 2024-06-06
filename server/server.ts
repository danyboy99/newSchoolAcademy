import express, { Request, Response } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import adminRoutes from "./routes/admin";
import studentRoutes from "./routes/student";

const app = express();

dotenv.config();
const DB_url: any = process.env.DB_URL;
console.log(DB_url);
mongoose
  .connect(DB_url)
  .then(() => {
    console.log("connected to database!!!");
  })
  .catch((err) => {
    console.log("error:", err.message);
  });
// set middlewares
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  return res.json("welcome to new school api");
});

//admin routes
app.use("/admin", adminRoutes);

//student routes
app.use("/student", studentRoutes);

const port = process.env.PORT || 6500;

app.listen(port, () => {
  console.log(`app is running on port ${port}`);
});
