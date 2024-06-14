import student from "../model/student";
import Student from "../model/student";
import argon from "argon2";
export const createStudent = async (
  firstName: string,
  lastName: string,
  middleName: string,
  email: string,
  regNumber: string,
  studentClass: string,
  passportImg?: string
) => {
  try {
    const newStudent = await Student.create({
      firstName,
      lastName,
      middleName,
      email,
      regNumber,
      class: studentClass,
      passportImg,
    });
    return newStudent;
  } catch (err: any) {
    throw new Error(err.message);
  }
};

export const findByRegnumber = async (regNumber: string) => {
  try {
    const foundStudent = await Student.findOne({ regNumber: regNumber });
    return foundStudent;
  } catch (err: any) {
    throw new Error(err.message);
  }
};

export const findStudentById = async (id: string) => {
  try {
    const foundStudent = await Student.findById(id);
    return foundStudent;
  } catch (err: any) {
    throw new Error(err.message);
  }
};

export const getAllStuednt = async () => {
  try {
    const students = await Student.find();
    return students;
  } catch (err: any) {
    throw new Error(err);
  }
};

export const createStudentNotification = async (
  title: string,
  content: string,
  regNumber: string
) => {
  try {
    let student = await Student.findOne({ regNumber: regNumber });
    if (!student) {
      return null;
    }
    let message = {
      title: title,
      content: content,
    };
    student.Notifications.push(message);

    await student.save();
    return student.Notifications;
  } catch (err: any) {
    throw new Error(err);
  }
};

export const updatePassword = async (studentId: string, password: string) => {
  try {
    const foundStudent: any = await Student.findById(studentId);

    let hashPassword = await argon.hash(password);

    foundStudent.password = hashPassword;

    await foundStudent.save();

    return foundStudent;
  } catch (err: any) {
    throw new Error(err);
  }
};

export const checkMyNoitification = async (studentId: string) => {
  try {
    const foundStudent = await Student.findById(studentId);
    let myNotification = foundStudent?.Notifications;
    return myNotification;
  } catch (err: any) {
    throw new Error(err);
  }
};

export const checkStudentDetails = async (studentId: string) => {
  try {
    const foundStudent = await Student.findById(studentId);
    let studentDetails = {
      id: foundStudent?._id,
      firstname: foundStudent?.firstName,
      lastname: foundStudent?.lastName,
      middlename: foundStudent?.middleName,
      regNumber: foundStudent?.regNumber,
      class: foundStudent?.class,
      email: foundStudent?.email,
      attendance: foundStudent?.attendance,
      passportImg: foundStudent?.passportImg,
    };
    return studentDetails;
  } catch (err: any) {
    throw new Error(err);
  }
};
