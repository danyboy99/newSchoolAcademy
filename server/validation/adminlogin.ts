import validator from "validator";
import isEmpty from "./isempty";
const validateLoginInput = (data: any) => {
  let error: any = {};

  data.staffnum = !isEmpty(data.staffnum) ? data.staffnum : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if (validator.isEmpty(data.staffnum)) {
    error.staffnum = "staffnum field is Required";
  }
  if (validator.isEmpty(data.password)) {
    error.password = "password field is Required";
  }

  return {
    error,
    isValid: isEmpty(error),
  };
};

export default validateLoginInput;
