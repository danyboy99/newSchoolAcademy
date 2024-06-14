import express, { Request, Response } from "express";
import {
  changePassword,
  checkStudentNotification,
  checkStudentResults,
  checkStudentTermResult,
  login,
  studentDetails,
} from "../controller/student";
import { signStudentToken } from "../config/verifyToken";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  return res.json("student index route");
});

router.post("/login", login);

router.get("/details", signStudentToken, studentDetails);

router.post("/updatepassword", signStudentToken, changePassword);

router.get("/notification", signStudentToken, checkStudentNotification);

router.post("/termresult", signStudentToken, checkStudentTermResult);

router.get("/results", signStudentToken, checkStudentResults);

export default router;
