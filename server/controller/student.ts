import { Request, Response } from "express";
import { findByRegnumber } from "../services/student";
import argon from "argon2";
import { signToken } from "../config/jwt_config";

export const login = async (req: Request, res: Response) => {
  try {
    const { regnumber, password } = req.body;

    const foundStudent = await findByRegnumber(regnumber);

    if (!foundStudent) {
      return res.json({
        status: "failed",
        msg: "no student found with this reg-number",
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
