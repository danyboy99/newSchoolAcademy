import Parent from "../model/parent";
import Payment from "../model/payment";
import argon from "argon2";
export const createParent = async (
  firstname: string,
  lastname: string,
  email: string,
  mobileNumber: number,
  childRegNumber: string
) => {
  try {
    const newParent = new Parent();
    newParent.firstname = firstname;
    newParent.lastname = lastname;
    newParent.email = email;
    newParent.mobileNumber = mobileNumber;
    newParent.childrenRegNumber.push(childRegNumber);
    await newParent.save();
    return newParent;
  } catch (err: any) {
    throw new Error(err);
  }
};

export const findParentBychildren = async (regNumber: string) => {
  try {
    const foundParent = await Parent.findOne({ childrenRegNumber: regNumber });
    return foundParent;
  } catch (err: any) {
    throw new Error(err);
  }
};

export const findParentByFirstLastName = async (
  firstname: string,
  lastname: string
) => {
  try {
    const foundParent = await Parent.findOne({
      firstname: firstname,
      lastname: lastname,
    });
    return foundParent;
  } catch (err: any) {
    throw new Error(err);
  }
};
export const addStudentToParent = async (
  regnumber: string,
  parentId: string
) => {
  try {
    const foundParent = await Parent.findOne({ _id: parentId });
    foundParent?.childrenRegNumber.push(regnumber);
    await foundParent?.save();
    return foundParent;
  } catch (err: any) {
    throw new Error(err);
  }
};

export const getAllParentMail = async () => {
  try {
    const allParent = await Parent.find();
    let parentEmail: Array<string> = [];
    allParent.forEach((parent) => {
      parentEmail.push(parent.email);
    });

    return parentEmail;
  } catch (err: any) {
    throw new Error(err);
  }
};

export const findParentByEmail = async (email: string) => {
  try {
    const foundParent = await Parent.findOne({ email: email });
    return foundParent;
  } catch (err: any) {
    throw new Error(err);
  }
};

export const createPayment = async (
  studentId: string,
  studentRegnum: string,
  parent: string,
  tx_ref: string,
  flw_ref: string,
  paymentId: string,
  amount: number,
  classPayedFor: string,
  termPayedFor: string,
  fullPayment: boolean
) => {
  try {
    const createdPayment = await Payment.create({
      student: studentId,
      studentRegnumber: studentRegnum,
      parent: parent,
      paymentTx_ref: tx_ref,
      paymentFlw_ref: flw_ref,
      paymentId: paymentId,
      paymentConfirmed: false,
      paymentCompleted: fullPayment,
      amount: amount,
      classPayedFor: classPayedFor,
      termPayedFor: termPayedFor,
    });

    return createdPayment;
  } catch (err: any) {
    throw new Error(err);
  }
};

export const findParentById = async (id: string) => {
  try {
    const foundParent = await Parent.findById(id);
    return foundParent;
  } catch (err: any) {
    throw new Error(err);
  }
};

export const updateParentPassword = async (
  parentId: string,
  password: string
) => {
  try {
    const foundParent: any = await Parent.findById(parentId);

    let hashPassword = await argon.hash(password);

    foundParent.password = hashPassword;

    await foundParent.save();

    return foundParent;
  } catch (err: any) {
    throw new Error(err.message);
  }
};

export const findPaymentByTx_ref = async (tx_ref: string) => {
  try {
    const foundPayment = await Payment.findOne({ paymentTx_ref: tx_ref });
    return foundPayment;
  } catch (err: any) {
    throw new Error(err.message);
  }
};

export const confirmPaymentStatus = async (tx_ref: string, status: boolean) => {
  try {
    if (status === true) {
      let foundPayment: any = await Payment.findOne({ paymentTx_ref: tx_ref });
      foundPayment.paymentConfirmed = true;
      await foundPayment.save();
      return foundPayment;
    } else {
      let foundPayment: any = await Payment.findOne({ paymentTx_ref: tx_ref });
      return foundPayment;
    }
  } catch (err: any) {
    throw new Error(err.message);
  }
};

export const updateParentDetails = async (
  parentId: string,
  email: string,
  number?: string
) => {
  try {
    let foundParent: any = await Parent.findById(parentId);
    foundParent.email = email;
    foundParent.mobileNumber = number;
    await foundParent.save();
    return foundParent;
  } catch (err: any) {
    throw new Error(err.message);
  }
};
