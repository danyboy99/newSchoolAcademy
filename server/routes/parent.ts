import express, { Request, Response } from "express";
import {
  changeParentPassword,
  checkPayment,
  initiatePayment,
  parentDetails,
  parentLogin,
  updateDetails,
  validatePayment,
} from "../controller/parent";
import { signParentToken } from "../config/verifyToken";

const router = express.Router();

router.post("/login", parentLogin);

router.post("/updatepassword", signParentToken, changeParentPassword);

router.post("/initiatepayment", signParentToken, initiatePayment);

router.post("/validatepayment", signParentToken, validatePayment);

router.post("/checkpayment", signParentToken, checkPayment);

router.put("/updatedetails", signParentToken, updateDetails);

router.put("/details", signParentToken, parentDetails);

export default router;
