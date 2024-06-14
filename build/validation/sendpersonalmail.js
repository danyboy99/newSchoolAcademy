"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validator_1 = __importDefault(require("validator"));
const isempty_1 = __importDefault(require("./isempty"));
const validatePersonalMail = (data) => {
    let error = {};
    data.subject = !(0, isempty_1.default)(data.subject) ? data.subject : "";
    data.text = !(0, isempty_1.default)(data.text) ? data.text : "";
    data.to = !(0, isempty_1.default)(data.to) ? data.to : "";
    if (validator_1.default.isEmpty(data.subject)) {
        error.subject = "subject field is Required";
    }
    if (validator_1.default.isEmpty(data.text)) {
        error.text = "text field is Required";
    }
    if (validator_1.default.isEmpty(data.to)) {
        error.to = "to field is Required";
    }
    return {
        error,
        isValid: (0, isempty_1.default)(error),
    };
};
exports.default = validatePersonalMail;
