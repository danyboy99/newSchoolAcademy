import validator from "validator";
import isEmpty from "./isempty";
const validateGeneralNotification = (data: any) => {
  let error: any = {};

  data.title = !isEmpty(data.title) ? data.title : "";
  data.content = !isEmpty(data.content) ? data.content : "";

  if (validator.isEmpty(data.title)) {
    error.title = "title field is Required";
  }
  if (validator.isEmpty(data.content)) {
    error.content = "content field is Required";
  }

  return {
    error,
    isValid: isEmpty(error),
  };
};

export default validateGeneralNotification;
