"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkStudentTermResult = exports.checkStudentResults = exports.studentDetails = exports.checkStudentNotification = exports.changePassword = exports.login = void 0;
const student_1 = require("../services/student");
const argon2_1 = __importDefault(require("argon2"));
const jwt_config_1 = require("../config/jwt_config");
const jwt_config_2 = require("../config/jwt_config");
const result_1 = require("../services/result");
const studentlogin_1 = __importDefault(require("../validation/studentlogin"));
const changepassword_1 = __importDefault(require("../validation/changepassword"));
const checktermresult_1 = __importDefault(require("../validation/checktermresult"));
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { error, isValid } = (0, studentlogin_1.default)(req.body);
        // check validation
        if (!isValid) {
            return res.status(400).json(error);
        }
        const { regnumber, password } = req.body;
        const foundStudent = yield (0, student_1.findByRegnumber)(regnumber);
        if (!foundStudent) {
            return res.json({
                status: "failed",
                msg: "no student found with this reg-number",
            });
        }
        if (foundStudent.password) {
            const verifyPassword = yield argon2_1.default.verify(foundStudent.password, password);
            if (!verifyPassword) {
                return res.json({
                    status: "failed",
                    msg: "incorrect password",
                });
            }
            let token = (0, jwt_config_1.signToken)(foundStudent);
            return res.json({
                status: "success",
                msg: "student login successfuly",
                token: token,
            });
        }
        else {
            let verifyLastname = false;
            if (foundStudent.lastName === password) {
                verifyLastname = true;
            }
            if (!verifyLastname) {
                return res.json({
                    status: "failed",
                    msg: "incorrect password",
                });
            }
            let token = (0, jwt_config_1.signToken)(foundStudent);
            return res.json({
                status: "success",
                msg: "student login successfuly",
                additionalMsg: "student should try and create a password to make account more secured",
                token: token,
            });
        }
    }
    catch (err) {
        return res.json({
            status: "failed",
            msg: err.message,
        });
    }
});
exports.login = login;
const changePassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { error, isValid } = (0, changepassword_1.default)(req.body);
        // check validation
        if (!isValid) {
            return res.status(400).json(error);
        }
        const { authorization = "" } = req.headers;
        const { password, password2 } = req.body;
        const studentId = yield (0, jwt_config_2.decodeToken)(authorization);
        const changedPassword = yield (0, student_1.updatePassword)(studentId, password);
        return res.json({
            status: "success",
            msg: "password updated successfully",
        });
    }
    catch (err) {
        return res.json({
            status: "failed",
            msg: err.message,
        });
    }
});
exports.changePassword = changePassword;
const checkStudentNotification = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { authorization = "" } = req.headers;
        const studentId = yield (0, jwt_config_2.decodeToken)(authorization);
        const notifications = yield (0, student_1.checkMyNoitification)(studentId);
        if (!notifications) {
            return res.json({
                status: "failed",
                msg: "no notification found",
            });
        }
        return res.json({
            status: "success",
            msg: "notification found",
            notifications: notifications,
        });
    }
    catch (err) {
        return res.json({
            status: "failed",
            msg: err.message,
        });
    }
});
exports.checkStudentNotification = checkStudentNotification;
const studentDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { authorization = "" } = req.headers;
        const studentId = yield (0, jwt_config_2.decodeToken)(authorization);
        const foundStudentDetails = yield (0, student_1.checkStudentDetails)(studentId);
        if (!foundStudentDetails) {
            return res.json({
                status: "failed",
                msg: "no student found",
            });
        }
        return res.json({
            status: "success",
            msg: "student found",
            student: foundStudentDetails,
        });
    }
    catch (err) {
        return res.json({
            status: "failed",
            msg: err.message,
        });
    }
});
exports.studentDetails = studentDetails;
const checkStudentResults = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { authorization = "" } = req.headers;
        const studentId = yield (0, jwt_config_2.decodeToken)(authorization);
        const foundStudent = yield (0, student_1.findStudentById)(studentId);
        const foundResults = yield (0, result_1.checkResults)(foundStudent.regNumber);
        if (!foundResults) {
            return res.json({
                status: "failed",
                msg: "no results found",
            });
        }
        return res.json({
            status: "success",
            msg: "result found",
            result: foundResults,
        });
    }
    catch (err) {
        return res.json({
            status: "failed",
            msg: err.message,
        });
    }
});
exports.checkStudentResults = checkStudentResults;
const checkStudentTermResult = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { error, isValid } = (0, checktermresult_1.default)(req.body);
        // check validation
        if (!isValid) {
            return res.status(400).json(error);
        }
        const { authorization = "" } = req.headers;
        const studentId = yield (0, jwt_config_2.decodeToken)(authorization);
        const { studentClass, term } = req.body;
        const foundStudent = yield (0, student_1.checkStudentDetails)(studentId);
        const foundResult = yield (0, result_1.checkResult)(foundStudent.regNumber, studentClass, term);
        if (!foundResult) {
            return res.json({
                status: "failed",
                msg: "no result found",
            });
        }
        return res.json({
            status: "success",
            msg: "result found",
            result: foundResult,
        });
    }
    catch (err) {
        return res.json({
            status: "failed",
            msg: err.message,
        });
    }
});
exports.checkStudentTermResult = checkStudentTermResult;
