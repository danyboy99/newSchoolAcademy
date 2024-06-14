import validator from "validator";
import isEmpty from "./isempty";
const validatePersonalMail = (data: any) => {
  let error: any = {};

  data.subject = !isEmpty(data.subject) ? data.subject : "";
  data.text = !isEmpty(data.text) ? data.text : "";
  data.to = !isEmpty(data.to) ? data.to : "";

  if (validator.isEmpty(data.subject)) {
    error.subject = "subject field is Required";
  }
  if (validator.isEmpty(data.text)) {
    error.text = "text field is Required";
  }
  if (validator.isEmpty(data.to)) {
    error.to = "to field is Required";
  }

  return {
    error,
    isValid: isEmpty(error),
  };
};

export default validatePersonalMail;
