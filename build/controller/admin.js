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
exports.sendPersonalMail = exports.sendGeneralMail = exports.checkGeneralNotification = exports.newStudentNotification = exports.newGeneralNotification = exports.checkStudentResult = exports.updateStudentResult = exports.createStudentResult = exports.createStudentAcc = exports.login = exports.signUp = void 0;
const admin_1 = require("../services/admin");
const jwt_config_1 = require("../config/jwt_config");
const argon2_1 = __importDefault(require("argon2"));
const student_1 = require("../services/student");
const result_1 = require("../services/result");
const notification_1 = require("../services/notification");
const nodemailer_1 = require("../config/nodemailer");
const parent_1 = require("../services/parent");
const adminsignup_1 = __importDefault(require("../validation/adminsignup"));
const adminlogin_1 = __importDefault(require("../validation/adminlogin"));
const createstudentacc_1 = __importDefault(require("../validation/createstudentacc"));
const createresult_1 = __importDefault(require("../validation/createresult"));
const generalnotification_1 = __importDefault(require("../validation/generalnotification"));
const studentnotification_1 = __importDefault(require("../validation/studentnotification"));
const sendgeneralmail_1 = __importDefault(require("../validation/sendgeneralmail"));
const sendpersonalmail_1 = __importDefault(require("../validation/sendpersonalmail"));
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { error, isValid } = (0, adminsignup_1.default)(req.body);
        // check validation
        if (!isValid) {
            return res.status(400).json(error);
        }
        const { firstname, lastname, email, password, staffnum, passportimg } = req.body;
        let createdAdmin = yield (0, admin_1.createAdmin)(firstname, lastname, email, password, staffnum, passportimg);
        if (!createdAdmin) {
            return res.json({
                status: "failed",
                msg: "something went wrong",
            });
        }
        let token = (0, jwt_config_1.signToken)(createdAdmin);
        return res.json({
            status: "success",
            msg: "admin created successfuly",
            token: token,
        });
    }
    catch (err) {
        return res.json({
            status: "failed",
            msg: err.message,
        });
    }
});
exports.signUp = signUp;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { error, isValid } = (0, adminlogin_1.default)(req.body);
        // check validation
        if (!isValid) {
            return res.status(400).json(error);
        }
        const { staffnum, password } = req.body;
        const foundAdmin = yield (0, admin_1.findByStaffnum)(staffnum);
        if (!foundAdmin) {
            return res.json({
                status: "failed",
                msg: "no staff found with this staffnumber",
            });
        }
        const verifyPassword = yield argon2_1.default.verify(foundAdmin.password, password);
        if (!verifyPassword) {
            return res.json({
                status: "failed",
                msg: "incorrect password",
            });
        }
        let token = (0, jwt_config_1.signToken)(foundAdmin);
        return res.json({
            status: "success",
            msg: "admin login successfuly",
            token: token,
        });
    }
    catch (err) {
        return res.json({
            status: "failed",
            msg: err.message,
        });
    }
});
exports.login = login;
const createStudentAcc = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { error, isValid } = (0, createstudentacc_1.default)(req.body);
        // check validation
        if (!isValid) {
            return res.status(400).json(error);
        }
        const { firstname, lastname, middlename, email, regnumber, studentclass, passportimg, parentemail, parentnumber, parentfirstname, parentlastname, } = req.body;
        const createdStudent = yield (0, student_1.createStudent)(firstname, lastname, middlename, email, regnumber, studentclass, passportimg);
        const parentExist = yield (0, parent_1.findParentByFirstLastName)(parentfirstname, parentlastname);
        if (parentExist) {
            const addChildrenToParent = yield (0, parent_1.addStudentToParent)(regnumber, parentExist._id.toString());
            return res.json({
                status: "success",
                msg: "student account created successfuly !!",
                student: createdStudent,
                parent: addChildrenToParent,
            });
        }
        else {
            const createdParent = yield (0, parent_1.createParent)(parentfirstname, parentlastname, parentemail, parentnumber, createdStudent.regNumber);
            return res.json({
                status: "success",
                msg: "student account created successfuly !!",
                student: createdStudent,
                parent: createdParent,
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
exports.createStudentAcc = createStudentAcc;
const createStudentResult = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { error, isValid } = (0, createresult_1.default)(req.body);
        // check validation
        if (!isValid) {
            return res.status(400).json(error);
        }
        const { regnumber, classresult, term, result } = req.body;
        const foundStudent = yield (0, student_1.findByRegnumber)(regnumber);
        if (!foundStudent) {
            return res.json({
                status: "failed",
                msg: "no student found with this reg-number",
            });
        }
        const existingResult = yield (0, result_1.checkResult)(regnumber, classresult, term);
        if (existingResult) {
            return res.json({
                status: "failed",
                msg: "Student already have an existing reasult",
                result: existingResult,
            });
        }
        const createNewStudentResult = yield (0, result_1.createResult)(regnumber, classresult, term, result);
        return res.json({
            status: "success",
            msg: "result created successfuly!!",
            result: createNewStudentResult,
        });
    }
    catch (err) {
        return res.json({
            status: "failed",
            msg: err.message,
        });
    }
});
exports.createStudentResult = createStudentResult;
const updateStudentResult = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { error, isValid } = (0, createresult_1.default)(req.body);
        // check validation
        if (!isValid) {
            return res.status(400).json(error);
        }
        const { regnumber, classresult, term, result } = req.body;
        const updatedResult = yield (0, result_1.updateResult)(regnumber, classresult, term, result);
        return res.json({
            status: "success",
            msg: " result updated successfully",
            result: updatedResult,
        });
    }
    catch (err) {
        return res.json({
            status: "failed",
            msg: err.message,
        });
    }
});
exports.updateStudentResult = updateStudentResult;
const checkStudentResult = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { regnumber } = req.body;
        if (!regnumber) {
            return res.json({
                regnumber: "regnumber is required ",
            });
        }
        const foundResults = yield (0, result_1.checkResults)(regnumber);
        if (!foundResults) {
            return res.json({
                status: "failed",
                msg: "no result found",
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
exports.checkStudentResult = checkStudentResult;
const newGeneralNotification = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { error, isValid } = (0, generalnotification_1.default)(req.body);
        // check validation
        if (!isValid) {
            return res.status(400).json(error);
        }
        const { title, content } = req.body;
        const createNewNotification = yield (0, notification_1.createNotification)(title, content);
        return res.json({
            status: "success",
            msg: "notification created successfuly",
            Notification: createNewNotification,
        });
    }
    catch (err) {
        return res.json({
            status: "failed",
            msg: err.message,
        });
    }
});
exports.newGeneralNotification = newGeneralNotification;
const newStudentNotification = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { error, isValid } = (0, studentnotification_1.default)(req.body);
        // check validation
        if (!isValid) {
            return res.status(400).json(error);
        }
        const { title, content, regnumber } = req.body;
        const studentNofication = yield (0, student_1.createStudentNotification)(title, content, regnumber);
        if (!studentNofication) {
            return res.json({
                status: "failed",
                msg: "no student found with this regnumber",
            });
        }
        return res.json({
            status: "success",
            msg: "notification sent to student successfuly",
            studentNofications: studentNofication,
        });
    }
    catch (err) {
        return res.json({
            status: "failed",
            msg: err.message,
        });
    }
});
exports.newStudentNotification = newStudentNotification;
const checkGeneralNotification = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allNotification = yield (0, notification_1.checkNotification)();
        return res.json({
            status: "suceess",
            msg: "all notification",
            notifications: allNotification,
        });
    }
    catch (err) {
        return res.json({
            status: "failed",
            msg: err.message,
        });
    }
});
exports.checkGeneralNotification = checkGeneralNotification;
const sendGeneralMail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { error, isValid } = (0, sendgeneralmail_1.default)(req.body);
        // check validation
        if (!isValid) {
            return res.status(400).json(error);
        }
        const { subject, text } = req.body;
        let option = {
            from: "danyboy99official@gmail.com",
            subject: subject,
            to: "",
            text: text,
        };
        const parentsMail = yield (0, parent_1.getAllParentMail)();
        let responseMsg = [];
        console.log("outerParent:", parentsMail);
        parentsMail.forEach((mail) => __awaiter(void 0, void 0, void 0, function* () {
            option.to = mail;
            console.log("outerOption:", option);
            let sentMailRes = yield (0, nodemailer_1.sendMail)(option);
            responseMsg.push(sentMailRes);
        }));
        return res.json({
            status: "success",
            msg: "message sent successfuly",
            mailResponce: responseMsg,
        });
    }
    catch (err) {
        return res.json({
            status: "failed",
            msg: err.message,
        });
    }
});
exports.sendGeneralMail = sendGeneralMail;
const sendPersonalMail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { error, isValid } = (0, sendpersonalmail_1.default)(req.body);
        // check validation
        if (!isValid) {
            return res.status(400).json(error);
        }
        const { subject, text, to } = req.body;
        let option = {
            from: "danyboy99official@gmail.com",
            subject: subject,
            to: to,
            text: text,
        };
        const sentmail = yield (0, nodemailer_1.sendMail)(option);
        return res.json({
            status: "success",
            msg: "message sent successfuly",
            mailInfo: sentmail,
        });
    }
    catch (err) {
        return res.json({
            status: "failed",
            msg: err.message,
        });
    }
});
exports.sendPersonalMail = sendPersonalMail;
