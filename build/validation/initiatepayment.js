"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validator_1 = __importDefault(require("validator"));
const isempty_1 = __importDefault(require("./isempty"));
const validatePaymentInput = (data) => {
    let error = {};
    data.studentRegnumber = !(0, isempty_1.default)(data.studentRegnumber)
        ? data.studentRegnumber
        : "";
    data.classPayedFor = !(0, isempty_1.default)(data.classPayedFor) ? data.classPayedFor : "";
    data.termPayedFor = !(0, isempty_1.default)(data.termPayedFor) ? data.termPayedFor : "";
    data.card_number = !(0, isempty_1.default)(data.card_number) ? data.card_number : "";
    data.card_cvv = !(0, isempty_1.default)(data.card_cvv) ? data.card_cvv : "";
    data.card_exp_month = !(0, isempty_1.default)(data.card_exp_month)
        ? data.card_exp_month
        : "";
    data.card_exp_year = !(0, isempty_1.default)(data.card_exp_year) ? data.card_exp_year : "";
    data.email = !(0, isempty_1.default)(data.email) ? data.email : "";
    data.name = !(0, isempty_1.default)(data.name) ? data.name : "";
    data.card_pin = !(0, isempty_1.default)(data.card_pin) ? data.card_pin : "";
    if (validator_1.default.isEmpty(data.studentRegnumber)) {
        error.studentRegnumber = "studentRegnumber field is Required";
    }
    if (validator_1.default.isEmpty(data.classPayedFor)) {
        error.classPayedFor = "classPayedFor field is Required";
    }
    if (validator_1.default.isEmpty(data.termPayedFor)) {
        error.termPayedFor = "termPayedFor field is Required";
    }
    if (validator_1.default.isEmpty(data.card_number)) {
        error.card_number = "card_number field is Required";
    }
    if (validator_1.default.isEmpty(data.card_cvv)) {
        error.card_cvv = "card_cvv field is Required";
    }
    if (validator_1.default.isEmpty(data.card_exp_month)) {
        error.card_exp_month = "card_exp_month field is Required";
    }
    if (validator_1.default.isEmpty(data.card_exp_year)) {
        error.card_exp_year = "card_exp_year field is Required";
    }
    if (validator_1.default.isEmpty(data.email)) {
        error.email = "email field is Required";
    }
    if (!validator_1.default.isEmail(data.email)) {
        error.email = "Email is invalid.";
    }
    if (validator_1.default.isEmpty(data.name)) {
        error.name = "name field is Required";
    }
    if (validator_1.default.isEmpty(data.card_pin)) {
        error.card_pin = "card_pin field is Required";
    }
    if (!Number(data.amount)) {
        error.amount = "amount must be a number";
    }
    return {
        error,
        isValid: (0, isempty_1.default)(error),
    };
};
exports.default = validatePaymentInput;
