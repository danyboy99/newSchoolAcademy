import Student from "../model/student";

export const createStudent = async (
  firstName: string,
  lastName: string,
  middleName: string,
  email: string,
  regNumber: string,
  studentClass: string,
  passportImg?: string,
  parentEmail?: string,
  parentNumber?: string
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
      parentEmail,
      parentNumber,
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
    throw new Error(err.message);
  }
};

export const createStudentNotification = async (
  content: string,
  regNumber: string
) => {
  try {
    let student = await Student.findOne({ regNumber: regNumber });
    if (!student) {
      return null;
    }
    student.Notifications.push(content);

    student.save();
    return student.Notifications;
  } catch (err: any) {
    throw new Error(err.message);
  }
};

export const findStudentByParent = async (parentEmail: string) => {
  try {
    const foundStudent = await Student.findOne({ parentEmail: parentEmail });
    return foundStudent;
  } catch (err: any) {
    throw new Error(err.message);
  }
};
