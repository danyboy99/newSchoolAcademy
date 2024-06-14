import validator from "validator";
import isEmpty from "./isempty";
const validateStudentSignup = (data: any) => {
  let error: any = {};

  data.firstname = !isEmpty(data.firstname) ? data.firstname : "";
  data.lastname = !isEmpty(data.lastname) ? data.lastname : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.middlename = !isEmpty(data.middlename) ? data.middlename : "";
  data.regnumber = !isEmpty(data.regnumber) ? data.regnumber : "";
  data.studentclass = !isEmpty(data.studentclass) ? data.studentclass : "";
  data.parentemail = !isEmpty(data.parentemail) ? data.parentemail : "";
  data.parentnumber = !isEmpty(data.parentnumber) ? data.parentnumber : "";
  data.parentfirstname = !isEmpty(data.parentfirstname)
    ? data.parentfirstname
    : "";
  data.parentlastname = !isEmpty(data.parentlastname)
    ? data.parentlastname
    : "";

  if (!validator.isEmail(data.email)) {
    error.email = "Email is invalid.";
  }
  if (validator.isEmpty(data.email)) {
    error.email = "email field is Required";
  }
  if (validator.isEmpty(data.firstname)) {
    error.firstname = "firstname field is Required";
  }
  if (validator.isEmpty(data.lastname)) {
    error.lastname = "lastname field is Required";
  }
  if (validator.isEmpty(data.middlename)) {
    error.middlename = "middlename field is Required";
  }

  if (validator.isEmpty(data.regnumber)) {
    error.regnumber = "regnumber field is Required";
  }
  if (validator.isEmpty(data.studentclass)) {
    error.studentclass = "studentclass field is Required";
  }
  if (validator.isEmpty(data.parentemail)) {
    error.parentemail = "parentemail field is Required";
  }
  if (!validator.isEmail(data.parentemail)) {
    error.parentemail = "parentemail is invalid.";
  }
  if (validator.isEmpty(data.parentnumber)) {
    error.parentnumber = "parentnumber field is Required";
  }
  if (validator.isEmpty(data.parentfirstname)) {
    error.parentfirstname = "parentfirstname field is Required";
  }
  if (validator.isEmpty(data.parentlastname)) {
    error.parentlastname = "parentlastname field is Required";
  }

  return {
    error,
    isValid: isEmpty(error),
  };
};

export default validateStudentSignup;
