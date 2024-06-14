import validator from "validator";
import isEmpty from "./isempty";
const validateOtp = (data: any) => {
  let error: any = {};

  data.otp = !isEmpty(data.otp) ? data.otp : "";
  data.flw_ref = !isEmpty(data.flw_ref) ? data.flw_ref : "";
  data.tx_ref = !isEmpty(data.tx_ref) ? data.tx_ref : "";

  if (validator.isEmpty(data.otp)) {
    error.otp = "otp field is Required";
  }
  if (validator.isEmpty(data.flw_ref)) {
    error.flw_ref = "flw_ref field is Required";
  }
  if (validator.isEmpty(data.tx_ref)) {
    error.tx_ref = "tx_ref field is Required";
  }
  return {
    error,
    isValid: isEmpty(error),
  };
};

export default validateOtp;
