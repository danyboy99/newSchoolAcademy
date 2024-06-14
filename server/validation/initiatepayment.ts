import validator from "validator";
import isEmpty from "./isempty";
const validatePaymentInput = (data: any) => {
  let error: any = {};

  data.studentRegnumber = !isEmpty(data.studentRegnumber)
    ? data.studentRegnumber
    : "";
  data.classPayedFor = !isEmpty(data.classPayedFor) ? data.classPayedFor : "";
  data.termPayedFor = !isEmpty(data.termPayedFor) ? data.termPayedFor : "";
  data.card_number = !isEmpty(data.card_number) ? data.card_number : "";
  data.card_cvv = !isEmpty(data.card_cvv) ? data.card_cvv : "";
  data.card_exp_month = !isEmpty(data.card_exp_month)
    ? data.card_exp_month
    : "";
  data.card_exp_year = !isEmpty(data.card_exp_year) ? data.card_exp_year : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.name = !isEmpty(data.name) ? data.name : "";
  data.card_pin = !isEmpty(data.card_pin) ? data.card_pin : "";

  if (validator.isEmpty(data.studentRegnumber)) {
    error.studentRegnumber = "studentRegnumber field is Required";
  }
  if (validator.isEmpty(data.classPayedFor)) {
    error.classPayedFor = "classPayedFor field is Required";
  }
  if (validator.isEmpty(data.termPayedFor)) {
    error.termPayedFor = "termPayedFor field is Required";
  }
  if (validator.isEmpty(data.card_number)) {
    error.card_number = "card_number field is Required";
  }
  if (validator.isEmpty(data.card_cvv)) {
    error.card_cvv = "card_cvv field is Required";
  }
  if (validator.isEmpty(data.card_exp_month)) {
    error.card_exp_month = "card_exp_month field is Required";
  }
  if (validator.isEmpty(data.card_exp_year)) {
    error.card_exp_year = "card_exp_year field is Required";
  }
  if (validator.isEmpty(data.email)) {
    error.email = "email field is Required";
  }
  if (!validator.isEmail(data.email)) {
    error.email = "Email is invalid.";
  }
  if (validator.isEmpty(data.name)) {
    error.name = "name field is Required";
  }
  if (validator.isEmpty(data.card_pin)) {
    error.card_pin = "card_pin field is Required";
  }
  if (!Number(data.amount)) {
    error.amount = "amount must be a number";
  }
  return {
    error,
    isValid: isEmpty(error),
  };
};

export default validatePaymentInput;
