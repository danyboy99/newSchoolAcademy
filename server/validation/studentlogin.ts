import validator from "validator";
import isEmpty from "./isempty";
const validateLoginInput = (data: any) => {
  let error: any = {};

  data.regnumber = !isEmpty(data.regnumber) ? data.regnumber : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if (validator.isEmpty(data.regnumber)) {
    error.regnumber = "regnumber field is Required";
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
