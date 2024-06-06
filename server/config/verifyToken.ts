import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { jwt_secret } from "./jwt_config";
import { findAdminById } from "../services/admin";
import { findStudentById } from "../services/student";

export const signAdminToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { authorization = "" } = req.headers;

    const decode: any = jwt.verify(authorization, jwt_secret);

    let foundId = decode.user;

    const foundAdmin = await findAdminById(foundId);

    if (!foundAdmin) {
      return res.json({
        status: "failed",
        msg: "user not authorized",
      });
    }

    return next();
  } catch (err: any) {
    return res.json({
      status: "failed",
      msg: err.message,
    });
  }
};

export const signStudentToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { authorization = "" } = req.headers;

    const decode: any = jwt.verify(authorization, jwt_secret);

    let foundId = decode.user;

    const foundStudent = await findStudentById(foundId);

    if (!foundStudent) {
      return res.json({
        status: "failed",
        msg: "user not authorized",
      });
    }

    return next();
  } catch (err: any) {
    return res.json({
      status: "failed",
      msg: err.message,
    });
  }
};
