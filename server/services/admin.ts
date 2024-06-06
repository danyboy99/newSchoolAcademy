import Admin from "../model/admin";
import argon from "argon2";

export const createAdmin = async (
  firstname: string,
  lastname: string,
  email: string,
  password: string,
  staffnum: string,
  passportImg?: string
) => {
  try {
    let hashPassword = await argon.hash(password);
    const newAdmin = await Admin.create({
      firstName: firstname,
      lastName: lastname,
      email: email,
      password: hashPassword,
      staffNum: staffnum,
      passportImg: passportImg,
    });

    return newAdmin;
  } catch (err: any) {
    throw new Error(err.message);
  }
};

export const findByStaffnum = async (staffnum: String) => {
  try {
    const foundAdmin = await Admin.findOne({ staffNum: staffnum });
    return foundAdmin;
  } catch (err: any) {
    throw new Error(err.message);
  }
};

export const findAdminById = async (id: string) => {
  try {
    const foundAdmin = await Admin.findById(id);
    return foundAdmin;
  } catch (err: any) {
    throw new Error(err.message);
  }
};
