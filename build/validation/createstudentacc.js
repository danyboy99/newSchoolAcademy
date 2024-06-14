"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validator_1 = __importDefault(require("validator"));
const isempty_1 = __importDefault(require("./isempty"));
const validateStudentSignup = (data) => {
    let error = {};
    data.firstname = !(0, isempty_1.default)(data.firstname) ? data.firstname : "";
    data.lastname = !(0, isempty_1.default)(data.lastname) ? data.lastname : "";
    data.email = !(0, isempty_1.default)(data.email) ? data.email : "";
    data.middlename = !(0, isempty_1.default)(data.middlename) ? data.middlename : "";
    data.regnumber = !(0, isempty_1.default)(data.regnumber) ? data.regnumber : "";
    data.studentclass = !(0, isempty_1.default)(data.studentclass) ? data.studentclass : "";
    data.parentemail = !(0, isempty_1.default)(data.parentemail) ? data.parentemail : "";
    data.parentnumber = !(0, isempty_1.default)(data.parentnumber) ? data.parentnumber : "";
    data.parentfirstname = !(0, isempty_1.default)(data.parentfirstname)
        ? data.parentfirstname
        : "";
    data.parentlastname = !(0, isempty_1.default)(data.parentlastname)
        ? data.parentlastname
        : "";
    if (!validator_1.default.isEmail(data.email)) {
        error.email = "Email is invalid.";
    }
    if (validator_1.default.isEmpty(data.email)) {
        error.email = "email field is Required";
    }
    if (validator_1.default.isEmpty(data.firstname)) {
        error.firstname = "firstname field is Required";
    }
    if (validator_1.default.isEmpty(data.lastname)) {
        error.lastname = "lastname field is Required";
    }
    if (validator_1.default.isEmpty(data.middlename)) {
        error.middlename = "middlename field is Required";
    }
    if (validator_1.default.isEmpty(data.regnumber)) {
        error.regnumber = "regnumber field is Required";
    }
    if (validator_1.default.isEmpty(data.studentclass)) {
        error.studentclass = "studentclass field is Required";
    }
    if (validator_1.default.isEmpty(data.parentemail)) {
        error.parentemail = "parentemail field is Required";
    }
    if (!validator_1.default.isEmail(data.parentemail)) {
        error.parentemail = "parentemail is invalid.";
    }
    if (validator_1.default.isEmpty(data.parentnumber)) {
        error.parentnumber = "parentnumber field is Required";
    }
    if (validator_1.default.isEmpty(data.parentfirstname)) {
        error.parentfirstname = "parentfirstname field is Required";
    }
    if (validator_1.default.isEmpty(data.parentlastname)) {
        error.parentlastname = "parentlastname field is Required";
    }
    return {
        error,
        isValid: (0, isempty_1.default)(error),
    };
};
exports.default = validateStudentSignup;
