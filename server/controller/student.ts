import { Request, Response } from "express";
import {
  checkMyNoitification,
  checkStudentDetails,
  findByRegnumber,
  findStudentById,
  updatePassword,
} from "../services/student";
import argon from "argon2";
import { signToken } from "../config/jwt_config";
import { decodeToken } from "../config/jwt_config";
import { checkResult, checkResults } from "../services/result";
import validateLoginInput from "../validation/studentlogin";
import validatePasswords from "../validation/changepassword";
import validateTermResult from "../validation/checktermresult";

export const login = async (req: Request, res: Response) => {
  try {
    const { error, isValid } = validateLoginInput(req.body);
    // check validation
    if (!isValid) {
      return res.status(400).json(error);
    }
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

export const changePassword = async (req: Request, res: Response) => {
  try {
    const { error, isValid } = validatePasswords(req.body);
    // check validation
    if (!isValid) {
      return res.status(400).json(error);
    }
    const { authorization = "" } = req.headers;
    const { password, password2 } = req.body;
    const studentId = await decodeToken(authorization);

    const changedPassword = await updatePassword(studentId, password);

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

export const checkStudentNotification = async (req: Request, res: Response) => {
  try {
    const { authorization = "" } = req.headers;
    const studentId = await decodeToken(authorization);
    const notifications = await checkMyNoitification(studentId);
    if (!notifications) {
      return res.json({
        status: "failed",
        msg: "no notification found",
      });
    }
    return res.json({
      status: "success",
      msg: "notification found",
      notifications: notifications,
    });
  } catch (err: any) {
    return res.json({
      status: "failed",
      msg: err.message,
    });
  }
};

export const studentDetails = async (req: Request, res: Response) => {
  try {
    const { authorization = "" } = req.headers;
    const studentId = await decodeToken(authorization);
    const foundStudentDetails = await checkStudentDetails(studentId);
    if (!foundStudentDetails) {
      return res.json({
        status: "failed",
        msg: "no student found",
      });
    }
    return res.json({
      status: "success",
      msg: "student found",
      student: foundStudentDetails,
    });
  } catch (err: any) {
    return res.json({
      status: "failed",
      msg: err.message,
    });
  }
};

export const checkStudentResults = async (req: Request, res: Response) => {
  try {
    const { authorization = "" } = req.headers;
    const studentId = await decodeToken(authorization);
    const foundStudent: any = await findStudentById(studentId);
    const foundResults = await checkResults(foundStudent.regNumber);
    if (!foundResults) {
      return res.json({
        status: "failed",
        msg: "no results found",
      });
    }
    return res.json({
      status: "success",
      msg: "result found",
      result: foundResults,
    });
  } catch (err: any) {
    return res.json({
      status: "failed",
      msg: err.message,
    });
  }
};

export const checkStudentTermResult = async (req: Request, res: Response) => {
  try {
    const { error, isValid } = validateTermResult(req.body);
    // check validation
    if (!isValid) {
      return res.status(400).json(error);
    }
    const { authorization = "" } = req.headers;
    const studentId = await decodeToken(authorization);
    const { studentClass, term } = req.body;
    const foundStudent: any = await checkStudentDetails(studentId);

    const foundResult = await checkResult(
      foundStudent.regNumber,
      studentClass,
      term
    );
    if (!foundResult) {
      return res.json({
        status: "failed",
        msg: "no result found",
      });
    }
    return res.json({
      status: "success",
      msg: "result found",
      result: foundResult,
    });
  } catch (err: any) {
    return res.json({
      status: "failed",
      msg: err.message,
    });
  }
};
