"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validator_1 = __importDefault(require("validator"));
const isempty_1 = __importDefault(require("./isempty"));
const validateTermResult = (data) => {
    let error = {};
    data.studentClass = !(0, isempty_1.default)(data.studentClass) ? data.studentClass : "";
    data.term = !(0, isempty_1.default)(data.term) ? data.term : "";
    if (validator_1.default.isEmpty(data.studentClass)) {
        error.studentClass = "studentClass field is Required";
    }
    if (validator_1.default.isEmpty(data.term)) {
        error.term = "term field is Required";
    }
    return {
        error,
        isValid: (0, isempty_1.default)(error),
    };
};
exports.default = validateTermResult;
