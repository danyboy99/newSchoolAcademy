import validator from "validator";
import isEmpty from "./isempty";
const validateTermResult = (data: any) => {
  let error: any = {};

  data.studentClass = !isEmpty(data.studentClass) ? data.studentClass : "";
  data.term = !isEmpty(data.term) ? data.term : "";

  if (validator.isEmpty(data.studentClass)) {
    error.studentClass = "studentClass field is Required";
  }
  if (validator.isEmpty(data.term)) {
    error.term = "term field is Required";
  }

  return {
    error,
    isValid: isEmpty(error),
  };
};

export default validateTermResult;
