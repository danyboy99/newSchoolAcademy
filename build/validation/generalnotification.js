"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const validator_1 = __importDefault(require("validator"));
const isempty_1 = __importDefault(require("./isempty"));
const validateGeneralNotification = (data) => {
    let error = {};
    data.title = !(0, isempty_1.default)(data.title) ? data.title : "";
    data.content = !(0, isempty_1.default)(data.content) ? data.content : "";
    if (validator_1.default.isEmpty(data.title)) {
        error.title = "title field is Required";
    }
    if (validator_1.default.isEmpty(data.content)) {
        error.content = "content field is Required";
    }
    return {
        error,
        isValid: (0, isempty_1.default)(error),
    };
};
exports.default = validateGeneralNotification;
