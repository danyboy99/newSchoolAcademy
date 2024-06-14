"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validator_1 = __importDefault(require("validator"));
const isempty_1 = __importDefault(require("./isempty"));
const validateLoginInput = (data) => {
    let error = {};
    data.email = !(0, isempty_1.default)(data.email) ? data.email : "";
    data.password = !(0, isempty_1.default)(data.password) ? data.password : "";
    if (validator_1.default.isEmpty(data.email)) {
        error.email = "email field is Required";
    }
    if (validator_1.default.isEmpty(data.password)) {
        error.password = "password field is Required";
    }
    return {
        error,
        isValid: (0, isempty_1.default)(error),
    };
};
exports.default = validateLoginInput;
