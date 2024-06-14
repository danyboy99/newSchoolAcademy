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
import { sendMail } from "../config/nodemailer";
import {
  addStudentToParent,
  createParent,
  findParentByFirstLastName,
  getAllParentMail,
} from "../services/parent";
import validateSignupInput from "../validation/adminsignup";
import validateLoginInput from "../validation/adminlogin";
import validateStudentSignup from "../validation/createstudentacc";
import validateCreateResult from "../validation/createresult";
import validateGeneralNotification from "../validation/generalnotification";
import validateStudentNotification from "../validation/studentnotification";
import validateSendGeneralMail from "../validation/sendgeneralmail";
import validatePersonalMail from "../validation/sendpersonalmail";

export const signUp = async (req: Request, res: Response) => {
  try {
    const { error, isValid } = validateSignupInput(req.body);
    // check validation
    if (!isValid) {
      return res.status(400).json(error);
    }

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
    const { error, isValid } = validateLoginInput(req.body);
    // check validation
    if (!isValid) {
      return res.status(400).json(error);
    }

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
      msg: "admin login successfuly",
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
    const { error, isValid } = validateStudentSignup(req.body);
    // check validation
    if (!isValid) {
      return res.status(400).json(error);
    }
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
      parentfirstname,
      parentlastname,
    } = req.body;

    const createdStudent = await createStudent(
      firstname,
      lastname,
      middlename,
      email,
      regnumber,
      studentclass,
      passportimg
    );
    const parentExist = await findParentByFirstLastName(
      parentfirstname,
      parentlastname
    );
    if (parentExist) {
      const addChildrenToParent = await addStudentToParent(
        regnumber,
        parentExist._id.toString()
      );
      return res.json({
        status: "success",
        msg: "student account created successfuly !!",
        student: createdStudent,
        parent: addChildrenToParent,
      });
    } else {
      const createdParent = await createParent(
        parentfirstname,
        parentlastname,
        parentemail,
        parentnumber,
        createdStudent.regNumber
      );
      return res.json({
        status: "success",
        msg: "student account created successfuly !!",
        student: createdStudent,
        parent: createdParent,
      });
    }
  } catch (err: any) {
    return res.json({
      status: "failed",
      msg: err.message,
    });
  }
};

export const createStudentResult = async (req: Request, res: Response) => {
  try {
    const { error, isValid } = validateCreateResult(req.body);
    // check validation
    if (!isValid) {
      return res.status(400).json(error);
    }

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
    const { error, isValid } = validateCreateResult(req.body);
    // check validation
    if (!isValid) {
      return res.status(400).json(error);
    }

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
    if (!regnumber) {
      return res.json({
        regnumber: "regnumber is required ",
      });
    }
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
    const { error, isValid } = validateGeneralNotification(req.body);
    // check validation
    if (!isValid) {
      return res.status(400).json(error);
    }
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
    const { error, isValid } = validateStudentNotification(req.body);
    // check validation
    if (!isValid) {
      return res.status(400).json(error);
    }
    const { title, content, regnumber } = req.body;

    const studentNofication = await createStudentNotification(
      title,
      content,
      regnumber
    );

    if (!studentNofication) {
      return res.json({
        status: "failed",
        msg: "no student found with this regnumber",
      });
    }
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
    const { error, isValid } = validateSendGeneralMail(req.body);
    // check validation
    if (!isValid) {
      return res.status(400).json(error);
    }
    const { subject, text } = req.body;
    let option = {
      from: "danyboy99official@gmail.com",
      subject: subject,
      to: "",
      text: text,
    };
    const parentsMail = await getAllParentMail();
    let responseMsg: any = [];
    console.log("outerParent:", parentsMail);
    parentsMail.forEach(async (mail) => {
      option.to = mail;
      console.log("outerOption:", option);
      let sentMailRes = await sendMail(option);
      responseMsg.push(sentMailRes);
    });

    return res.json({
      status: "success",
      msg: "message sent successfuly",
      mailResponce: responseMsg,
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
    const { error, isValid } = validatePersonalMail(req.body);
    // check validation
    if (!isValid) {
      return res.status(400).json(error);
    }
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
