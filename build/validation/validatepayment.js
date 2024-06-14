"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validator_1 = __importDefault(require("validator"));
const isempty_1 = __importDefault(require("./isempty"));
const validateOtp = (data) => {
    let error = {};
    data.otp = !(0, isempty_1.default)(data.otp) ? data.otp : "";
    data.flw_ref = !(0, isempty_1.default)(data.flw_ref) ? data.flw_ref : "";
    data.tx_ref = !(0, isempty_1.default)(data.tx_ref) ? data.tx_ref : "";
    if (validator_1.default.isEmpty(data.otp)) {
        error.otp = "otp field is Required";
    }
    if (validator_1.default.isEmpty(data.flw_ref)) {
        error.flw_ref = "flw_ref field is Required";
    }
    if (validator_1.default.isEmpty(data.tx_ref)) {
        error.tx_ref = "tx_ref field is Required";
    }
    return {
        error,
        isValid: (0, isempty_1.default)(error),
    };
};
exports.default = validateOtp;
