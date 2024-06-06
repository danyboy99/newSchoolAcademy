import express, { Request, Response } from "express";
import {
  checkStudentResult,
  createStudentAcc,
  createStudentResult,
  login,
  signUp,
  updateStudentResult,
} from "../controller/admin";
import { signAdminToken } from "../config/verifyToken";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  return res.json("student index route");
});

router.post("/login", login);

router.post("/signup", signAdminToken, signUp);

router.post("/createstudentacc", signAdminToken, createStudentAcc);

router.post("/createstudentresult", signAdminToken, createStudentResult);

router.post("/createstudentresult", signAdminToken, createStudentResult);

router.put("/updateresult", signAdminToken, updateStudentResult);

router.post("/getstudentresult", signAdminToken, checkStudentResult);

export default router;
