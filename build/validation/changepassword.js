"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validator_1 = __importDefault(require("validator"));
const isempty_1 = __importDefault(require("./isempty"));
const validatePasswords = (data) => {
    let error = {};
    data.password = !(0, isempty_1.default)(data.password) ? data.password : "";
    data.password2 = !(0, isempty_1.default)(data.password2) ? data.password2 : "";
    if (validator_1.default.isEmpty(data.password)) {
        error.password = "password field is Required";
    }
    if (validator_1.default.isEmpty(data.password2)) {
        error.password2 = "password2 field is Required";
    }
    if (data.password !== data.password2) {
        error.password2 = "password must match";
    }
    return {
        error,
        isValid: (0, isempty_1.default)(error),
    };
};
exports.default = validatePasswords;
