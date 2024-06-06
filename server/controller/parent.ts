import { Request, Response } from "express";
import { findStudentByParent } from "../services/student";
import argon from "argon2";
import { signToken } from "../config/jwt_config";

export const parentLogin = async (req: Request, res: Response) => {
  try {
    const { parentEmail, password } = req.body;
    const foundStudent = await findStudentByParent(parentEmail);
    if (!foundStudent) {
      return res.json({
        status: "failed",
        msg: "no parent found with this email",
      });
    }
    if (foundStudent.password) {
      const verifyPassword = await argon.verify(
        foundStudent.password,
        password
      );
      if (!verifyPassword) {
        return res.json({
          status: "failed",
          msg: "incorrect password",
        });
      }
      let token = signToken(foundStudent);
      return res.json({
        status: "success",
        msg: "student login successfuly",
        token: token,
      });
    } else {
      let verifyLastname = false;

      if (foundStudent.lastName === password) {
        verifyLastname = true;
      }

      if (!verifyLastname) {
        return res.json({
          status: "failed",
          msg: "incorrect password",
        });
      }

      let token = signToken(foundStudent);
      return res.json({
        status: "success",
        msg: "student login successfuly",
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

export const makePayment = async (req: Request, res: Response) => {
  try {
  } catch (err: any) {
    return res.json({
      status: "failed",
      msg: err.message,
    });
  }
};
