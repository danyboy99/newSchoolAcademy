import validator from "validator";
import isEmpty from "./isempty";
const validateCreateResult = (data: any) => {
  let error: any = {};

  data.regnumber = !isEmpty(data.regnumber) ? data.regnumber : "";
  data.classresult = !isEmpty(data.classresult) ? data.classresult : "";
  data.term = !isEmpty(data.term) ? data.term : "";

  if (validator.isEmpty(data.regnumber)) {
    error.regnumber = "regnumber field is Required";
  }
  if (validator.isEmpty(data.classresult)) {
    error.classresult = "classresult field is Required";
  }
  if (validator.isEmpty(data.term)) {
    error.term = "term field is Required";
  }
  if (!data.result) {
    error.result = "result field is Required";
  }
  if (data?.result.length < 8) {
    error.result = "result must be more than or equals to 8";
  }

  return {
    error,
    isValid: isEmpty(error),
  };
};

export default validateCreateResult;
