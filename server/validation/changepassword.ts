import validator from "validator";
import isEmpty from "./isempty";
const validatePasswords = (data: any) => {
  let error: any = {};

  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

  if (validator.isEmpty(data.password)) {
    error.password = "password field is Required";
  }
  if (validator.isEmpty(data.password2)) {
    error.password2 = "password2 field is Required";
  }
  if (data.password !== data.password2) {
    error.password2 = "password must match";
  }

  return {
    error,
    isValid: isEmpty(error),
  };
};

export default validatePasswords;
