"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validator_1 = __importDefault(require("validator"));
const isempty_1 = __importDefault(require("./isempty"));
const validateCreateResult = (data) => {
    let error = {};
    data.regnumber = !(0, isempty_1.default)(data.regnumber) ? data.regnumber : "";
    data.classresult = !(0, isempty_1.default)(data.classresult) ? data.classresult : "";
    data.term = !(0, isempty_1.default)(data.term) ? data.term : "";
    if (validator_1.default.isEmpty(data.regnumber)) {
        error.regnumber = "regnumber field is Required";
    }
    if (validator_1.default.isEmpty(data.classresult)) {
        error.classresult = "classresult field is Required";
    }
    if (validator_1.default.isEmpty(data.term)) {
        error.term = "term field is Required";
    }
    if (!data.result) {
        error.result = "result field is Required";
    }
    if ((data === null || data === void 0 ? void 0 : data.result.length) < 8) {
        error.result = "result must be more than or equals to 8";
    }
    return {
        error,
        isValid: (0, isempty_1.default)(error),
    };
};
exports.default = validateCreateResult;
