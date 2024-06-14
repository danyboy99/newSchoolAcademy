import { Request, Response } from "express";
import argon from "argon2";
import { signToken, decodeToken } from "../config/jwt_config";
import {
  confirmPaymentStatus,
  createPayment,
  findParentByEmail,
  findParentById,
  findPaymentByTx_ref,
  updateParentDetails,
  updateParentPassword,
} from "../services/parent";
import flutterwave from "../config/fluterwave";
import { findByRegnumber } from "../services/student";
import validateLoginInput from "../validation/parentlogin";
import validatePasswords from "../validation/changepassword";
import validatePaymentInput from "../validation/initiatepayment";
import validateOtp from "../validation/validatepayment";

const fullTermFee = 200000;
let fullTermFeeStatus = false;
export const parentLogin = async (req: Request, res: Response) => {
  try {
    const { error, isValid } = validateLoginInput(req.body);
    // check validation
    if (!isValid) {
      return res.status(400).json(error);
    }

    const { email, password } = req.body;
    const foundParent = await findParentByEmail(email);
    if (!foundParent) {
      return res.json({
        status: "failed",
        msg: "no parent found with this Email",
      });
    }
    if (foundParent.password) {
      const verifyPassword = await argon.verify(foundParent.password, password);
      if (!verifyPassword) {
        return res.json({
          status: "failed",
          msg: "incorrect password ",
        });
      }
      const token = signToken(foundParent);
      return res.json({
        status: "success",
        msg: "parent login successfuly",
        token: token,
      });
    } else {
      let verifyLastname = false;

      if (foundParent.lastname === password) {
        verifyLastname = true;
      }

      if (!verifyLastname) {
        return res.json({
          status: "failed",
          msg: "incorrect password",
        });
      }
      const token = signToken(foundParent);
      return res.json({
        status: "success",
        msg: "parent login successfuly",
        additionalMsg:
          "student should try and create a password to make account more secured",
        token: token,
      });
    }
  } catch (err: any) {
    return res.json({
      status: "failed",
      msg: err.message,
    });
  }
};

export const changeParentPassword = async (req: Request, res: Response) => {
  try {
    const { error, isValid } = validatePasswords(req.body);
    // check validation
    if (!isValid) {
      return res.status(400).json(error);
    }

    const { authorization = "" } = req.headers;
    const { password, password2 } = req.body;
    const parentId = await decodeToken(authorization);
    const changedPassword = await updateParentPassword(parentId, password);
    return res.json({
      status: "success",
      msg: "password updated successfully",
    });
  } catch (err: any) {
    return res.json({
      status: "failed",
      msg: err.message,
    });
  }
};

export const initiatePayment = async (req: Request, res: Response) => {
  try {
    const { error, isValid } = validatePaymentInput(req.body);
    // check validation
    if (!isValid) {
      return res.status(400).json(error);
    }
    const { authorization = "" } = req.headers;
    const parentId = await decodeToken(authorization);

    const {
      studentRegnumber,
      classPayedFor,
      termPayedFor,
      card_number,
      card_cvv,
      card_exp_month,
      card_exp_year,
      email,
      name,
      amount,
      card_pin,
    } = req.body;
    const foundStudent = await findByRegnumber(studentRegnumber);
    if (!foundStudent) {
      return res.json({
        status: "failed",
        msg: "no student found with this regNumber",
      });
    }
    const tx_ref = "02" + Math.floor(Math.random() * 1000000000 + 1);
    let payload = {
      card_number: card_number,
      cvv: card_cvv,
      expiry_month: card_exp_month,
      expiry_year: card_exp_year,
      currency: "NGN",
      amount,
      fullname: name,
      email: email,
      phone_number: "09000000000",
      enckey: "FLWSECK_TEST251672747cae",
      redirect_url: "http://localhost:6500/",
      tx_ref,
    };

    const initiateCardCharge = await flutterwave.charge.card(payload);

    if (initiateCardCharge.meta.authorization.mode === "pin") {
      let payload2: any = payload;
      payload2.authorization = {
        mode: "pin",
        pin: card_pin,
      };
      if (fullTermFee > amount) {
        fullTermFeeStatus = true;
      }
      const recallCardCharge = await flutterwave.charge.card(payload2);
      const createdPaymentCollection = await createPayment(
        foundStudent._id.toString(),
        studentRegnumber,
        parentId,
        tx_ref,
        recallCardCharge.data.flw_ref,
        recallCardCharge.data.id.toString(),
        amount,
        classPayedFor,
        termPayedFor,
        fullTermFeeStatus
      );
      return res.json({
        status: "success",
        msg: `${recallCardCharge.data.processor_response}`,
        flutterwaveResponce: recallCardCharge,
      });
    }

    if (initiateCardCharge.meta.authorization.mode === "redirect") {
      return res.json({
        status: "pending",
        msg: "card not authorized",
      });
    } else {
      res.json({
        status: "failed",
        msg: "card not authorized!!",
      });
    }
  } catch (err: any) {
    return res.json({
      status: "failed",
      msg: err.message,
    });
  }
};

export const validatePayment = async (req: Request, res: Response) => {
  try {
    const { error, isValid } = validateOtp(req.body);
    // check validation
    if (!isValid) {
      return res.status(400).json(error);
    }

    const { otp, flw_ref, tx_ref } = req.body;

    const chargeValidate = await flutterwave.charge.validate({
      otp: otp,
      flw_ref: flw_ref,
    });

    if (chargeValidate.status === "success") {
      const confirmPayment = await confirmPaymentStatus(tx_ref, true);
      return res.json({
        status: "success",
        msg: "payment confirm successfully",
        recipt: confirmPayment,
      });
    } else {
      return res.json({
        status: chargeValidate.status,
        msg: "payment not confirmed",
        response: chargeValidate,
      });
    }
  } catch (err: any) {
    return res.json({
      status: "failed",
      msg: err.message,
    });
  }
};

export const checkPayment = async (req: Request, res: Response) => {
  try {
    const { tx_ref } = req.body;
    if (!tx_ref) {
      return res.json({
        tx_ref: "tx_ref is required",
      });
    }
    const foundPayment = await findPaymentByTx_ref(tx_ref);
    if (!foundPayment) {
      return res.json({
        status: "failed",
        msg: "no payment slip found with this tx_ref",
      });
    }
    if (foundPayment?.paymentConfirmed === true) {
      return res.json({
        status: "success",
        msg: "payment confirmed",
        slip: foundPayment,
      });
    } else {
      return res.json({
        status: "failed",
        msg: "payment not confirmed",
        slip: foundPayment,
      });
    }
  } catch (err: any) {
    return res.json({
      status: "failed",
      msg: err.message,
    });
  }
};

export const updateDetails = async (req: Request, res: Response) => {
  try {
    const { email, number } = req.body;
    const { authorization = "" } = req.headers;
    const parentId = await decodeToken(authorization);
    const updatedDetails = await updateParentDetails(parentId, email, number);
    if (!updatedDetails) {
      return res.json({
        status: "failed",
        msg: "no parent found",
      });
    }

    return res.json({
      status: "success",
      msg: "details updated successfuly",
      details: updatedDetails,
    });
  } catch (err: any) {
    return res.json({
      status: "failed",
      msg: err.message,
    });
  }
};

export const parentDetails = async (req: Request, res: Response) => {
  try {
    const { authorization = "" } = req.headers;
    const parentId = await decodeToken(authorization);
    const foundParent = await findParentById(parentId);
    if (!foundParent) {
      return res.json({
        status: "failed",
        msg: "no parent found",
      });
    }
    let details = {
      firstname: foundParent.firstname,
      lastname: foundParent.lastname,
      email: foundParent.email,
      Number: foundParent.mobileNumber,
      id: foundParent._id,
    };
    return res.json({
      status: "success",
      msg: "parent found",
      Details: details,
    });
  } catch (err: any) {
    return res.json({
      status: "failed",
      msg: err.message,
    });
  }
};
