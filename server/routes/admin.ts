import express, { Request, Response } from "express";
import {
  checkGeneralNotification,
  checkStudentResult,
  createStudentAcc,
  createStudentResult,
  login,
  newGeneralNotification,
  newStudentNotification,
  sendGeneralMail,
  sendPersonalMail,
  signUp,
  updateStudentResult,
} from "../controller/admin";
import { signAdminToken } from "../config/verifyToken";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  return res.json("student index route");
});

router.post("/login", login);

router.post("/signup", signUp);

router.post("/createstudentacc", signAdminToken, createStudentAcc);

router.post("/createstudentresult", signAdminToken, createStudentResult);

router.put("/updateresult", signAdminToken, updateStudentResult);

router.post("/getstudentresult", signAdminToken, checkStudentResult);

router.post("/generalnotification", signAdminToken, newGeneralNotification);

router.post("/studentnotification", signAdminToken, newStudentNotification);

router.get("/checknotification", signAdminToken, checkGeneralNotification);

router.post("/sendgeneralemail", signAdminToken, sendGeneralMail);

router.post("/sendsinglemail", signAdminToken, sendPersonalMail);

export default router;
