import validator from "validator";
import isEmpty from "./isempty";
const validateSignupInput = (data: any) => {
  let error: any = {};

  data.firstname = !isEmpty(data.firstname) ? data.firstname : "";
  data.lastname = !isEmpty(data.lastname) ? data.lastname : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.staffnum = !isEmpty(data.staffnum) ? data.staffnum : "";

  if (!validator.isEmail(data.email)) {
    error.email = "Email is invalid.";
  }
  if (validator.isEmpty(data.email)) {
    error.email = "email field is Required";
  }
  if (validator.isEmpty(data.password)) {
    error.password = "password field is Required";
  }
  if (validator.isEmpty(data.firstname)) {
    error.firstname = "firstname field is Required";
  }
  if (validator.isEmpty(data.lastname)) {
    error.lastname = "lastname field is Required";
  }

  if (validator.isEmpty(data.staffnum)) {
    error.staffnum = "staffnum field is Required";
  }

  return {
    error,
    isValid: isEmpty(error),
  };
};

export default validateSignupInput;
