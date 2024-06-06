import express, { Request, Response } from "express";
import { login } from "../controller/student";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  return res.json("admin index route");
});

router.post("/login", login);

export default router;
