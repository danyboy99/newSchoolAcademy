"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validator_1 = __importDefault(require("validator"));
const isempty_1 = __importDefault(require("./isempty"));
const validateSignupInput = (data) => {
    let error = {};
    data.firstname = !(0, isempty_1.default)(data.firstname) ? data.firstname : "";
    data.lastname = !(0, isempty_1.default)(data.lastname) ? data.lastname : "";
    data.email = !(0, isempty_1.default)(data.email) ? data.email : "";
    data.password = !(0, isempty_1.default)(data.password) ? data.password : "";
    data.staffnum = !(0, isempty_1.default)(data.staffnum) ? data.staffnum : "";
    if (!validator_1.default.isEmail(data.email)) {
        error.email = "Email is invalid.";
    }
    if (validator_1.default.isEmpty(data.email)) {
        error.email = "email field is Required";
    }
    if (validator_1.default.isEmpty(data.password)) {
        error.password = "password field is Required";
    }
    if (validator_1.default.isEmpty(data.firstname)) {
        error.firstname = "firstname field is Required";
    }
    if (validator_1.default.isEmpty(data.lastname)) {
        error.lastname = "lastname field is Required";
    }
    if (validator_1.default.isEmpty(data.staffnum)) {
        error.staffnum = "staffnum field is Required";
    }
    return {
        error,
        isValid: (0, isempty_1.default)(error),
    };
};
exports.default = validateSignupInput;
