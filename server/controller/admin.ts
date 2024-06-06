import { Request, Response } from "express";
import { createAdmin, findByStaffnum } from "../services/admin";
import { signToken } from "../config/jwt_config";
import argon from "argon2";
import {
  createStudent,
  createStudentNotification,
  findByRegnumber,
  getAllStuednt,
} from "../services/student";
import {
  checkResult,
  checkResults,
  createResult,
  updateResult,
} from "../services/result";
import {
  checkNotification,
  createNotification,
} from "../services/notification";
import notifications from "../model/notification";
import { sendMail } from "../config/nodemailer";

export const signUp = async (req: Request, res: Response) => {
  try {
    const { firstname, lastname, email, password, staffnum, passportimg } =
      req.body;

    let createdAdmin = await createAdmin(
      firstname,
      lastname,
      email,
      password,
      staffnum,
      passportimg
    );
    if (!createdAdmin) {
      return res.json({
        status: "failed",
        msg: "something went wrong",
      });
    }
    let token = signToken(createdAdmin);
    return res.json({
      status: "success",
      msg: "admin created successfuly",
      token: token,
    });
  } catch (err: any) {
    return res.json({
      status: "failed",
      msg: err.message,
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { staffnum, password } = req.body;

    const foundAdmin = await findByStaffnum(staffnum);

    if (!foundAdmin) {
      return res.json({
        status: "failed",
        msg: "no staff found with this staffnumber",
      });
    }

    const verifyPassword = await argon.verify(foundAdmin.password, password);

    if (!verifyPassword) {
      return res.json({
        status: "failed",
        msg: "incorrect password",
      });
    }

    let token = signToken(foundAdmin);
    return res.json({
      status: "success",
      msg: "admin created successfuly",
      token: token,
    });
  } catch (err: any) {
    return res.json({
      status: "failed",
      msg: err.message,
    });
  }
};

export const createStudentAcc = async (req: Request, res: Response) => {
  try {
    const {
      firstname,
      lastname,
      middlename,
      email,
      regnumber,
      studentclass,
      passportimg,
      parentemail,
      parentnumber,
    } = req.body;

    const createdStudent = await createStudent(
      firstname,
      lastname,
      middlename,
      email,
      regnumber,
      studentclass,
      passportimg,
      parentemail,
      parentnumber
    );
    return res.json({
      status: "success",
      msg: "student account created successfuly !!",
      student: createdStudent,
    });
  } catch (err: any) {
    return res.json({
      status: "failed",
      msg: err.message,
    });
  }
};

export const createStudentResult = async (req: Request, res: Response) => {
  try {
    const { regnumber, classresult, term, result } = req.body;

    const foundStudent = await findByRegnumber(regnumber);
    if (!foundStudent) {
      return res.json({
        status: "failed",
        msg: "no student found with this reg-number",
      });
    }
    const existingResult = await checkResult(regnumber, classresult, term);
    if (existingResult) {
      return res.json({
        status: "failed",
        msg: "Student already have an existing reasult",
        result: existingResult,
      });
    }
    const createNewStudentResult = await createResult(
      regnumber,
      classresult,
      term,
      result
    );
    return res.json({
      status: "success",
      msg: "result created successfuly!!",
      result: createNewStudentResult,
    });
  } catch (err: any) {
    return res.json({
      status: "failed",
      msg: err.message,
    });
  }
};

export const updateStudentResult = async (req: Request, res: Response) => {
  try {
    const { regnumber, classresult, term, result } = req.body;

    const updatedResult = await updateResult(
      regnumber,
      classresult,
      term,
      result
    );

    return res.json({
      status: "success",
      msg: " result updated successfully",
      result: updatedResult,
    });
  } catch (err: any) {
    return res.json({
      status: "failed",
      msg: err.message,
    });
  }
};

export const checkStudentResult = async (req: Request, res: Response) => {
  try {
    const { regnumber } = req.body;

    const foundResults = await checkResults(regnumber);
    if (!foundResults) {
      return res.json({
        status: "failed",
        msg: "no result found",
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

export const newGeneralNotification = async (req: Request, res: Response) => {
  try {
    const { title, content } = req.body;

    const createNewNotification = await createNotification(title, content);

    return res.json({
      status: "success",
      msg: "notification created successfuly",
      Notification: createNewNotification,
    });
  } catch (err: any) {
    return res.json({
      status: "failed",
      msg: err.message,
    });
  }
};

export const newStudentNotification = async (req: Request, res: Response) => {
  try {
    const { content, regnumber } = req.body;

    const studentNofication = await createStudentNotification(
      content,
      regnumber
    );
    return res.json({
      status: "success",
      msg: "notification sent to student successfuly",
      studentNofications: studentNofication,
    });
  } catch (err: any) {
    return res.json({
      status: "failed",
      msg: err.message,
    });
  }
};

export const checkGeneralNotification = async (req: Request, res: Response) => {
  try {
    const allNotification = await checkNotification();
    return res.json({
      status: "suceess",
      msg: "all notification",
      notifications: allNotification,
    });
  } catch (err: any) {
    return res.json({
      status: "failed",
      msg: err.message,
    });
  }
};

export const sendGeneralMail = async (req: Request, res: Response) => {
  try {
    const { subject, text } = req.body;
    let option = {
      from: "danyboy99official@gmail.com",
      subject: subject,
      to: "",
      text: text,
    };
    let parentEmails: Array<string> = [];
    const students = await getAllStuednt();
    students.forEach((student) => {
      let email: any = student.parentEmail;
      parentEmails.push(email);
    });
    parentEmails.forEach(async (parentMail) => {
      option.to = parentMail;
      await sendMail(option);
    });
    return res.json({
      status: "success",
      msg: "message sent successfuly",
    });
  } catch (err: any) {
    return res.json({
      status: "failed",
      msg: err.message,
    });
  }
};

export const sendPersonalMail = async (req: Request, res: Response) => {
  try {
    const { subject, text, to } = req.body;
    let option = {
      from: "danyboy99official@gmail.com",
      subject: subject,
      to: to,
      text: text,
    };
    const sentmail = await sendMail(option);
    return res.json({
      status: "success",
      msg: "message sent successfuly",
      mailInfo: sentmail,
    });
  } catch (err: any) {
    return res.json({
      status: "failed",
      msg: err.message,
    });
  }
};
