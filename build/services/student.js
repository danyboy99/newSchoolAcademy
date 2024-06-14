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
exports.checkStudentDetails = exports.checkMyNoitification = exports.updatePassword = exports.createStudentNotification = exports.getAllStuednt = exports.findStudentById = exports.findByRegnumber = exports.createStudent = void 0;
const student_1 = __importDefault(require("../model/student"));
const argon2_1 = __importDefault(require("argon2"));
const createStudent = (firstName, lastName, middleName, email, regNumber, studentClass, passportImg) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newStudent = yield student_1.default.create({
            firstName,
            lastName,
            middleName,
            email,
            regNumber,
            class: studentClass,
            passportImg,
        });
        return newStudent;
    }
    catch (err) {
        throw new Error(err.message);
    }
});
exports.createStudent = createStudent;
const findByRegnumber = (regNumber) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const foundStudent = yield student_1.default.findOne({ regNumber: regNumber });
        return foundStudent;
    }
    catch (err) {
        throw new Error(err.message);
    }
});
exports.findByRegnumber = findByRegnumber;
const findStudentById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const foundStudent = yield student_1.default.findById(id);
        return foundStudent;
    }
    catch (err) {
        throw new Error(err.message);
    }
});
exports.findStudentById = findStudentById;
const getAllStuednt = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const students = yield student_1.default.find();
        return students;
    }
    catch (err) {
        throw new Error(err);
    }
});
exports.getAllStuednt = getAllStuednt;
const createStudentNotification = (title, content, regNumber) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let student = yield student_1.default.findOne({ regNumber: regNumber });
        if (!student) {
            return null;
        }
        let message = {
            title: title,
            content: content,
        };
        student.Notifications.push(message);
        yield student.save();
        return student.Notifications;
    }
    catch (err) {
        throw new Error(err);
    }
});
exports.createStudentNotification = createStudentNotification;
const updatePassword = (studentId, password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const foundStudent = yield student_1.default.findById(studentId);
        let hashPassword = yield argon2_1.default.hash(password);
        foundStudent.password = hashPassword;
        yield foundStudent.save();
        return foundStudent;
    }
    catch (err) {
        throw new Error(err);
    }
});
exports.updatePassword = updatePassword;
const checkMyNoitification = (studentId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const foundStudent = yield student_1.default.findById(studentId);
        let myNotification = foundStudent === null || foundStudent === void 0 ? void 0 : foundStudent.Notifications;
        return myNotification;
    }
    catch (err) {
        throw new Error(err);
    }
});
exports.checkMyNoitification = checkMyNoitification;
const checkStudentDetails = (studentId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const foundStudent = yield student_1.default.findById(studentId);
        let studentDetails = {
            id: foundStudent === null || foundStudent === void 0 ? void 0 : foundStudent._id,
            firstname: foundStudent === null || foundStudent === void 0 ? void 0 : foundStudent.firstName,
            lastname: foundStudent === null || foundStudent === void 0 ? void 0 : foundStudent.lastName,
            middlename: foundStudent === null || foundStudent === void 0 ? void 0 : foundStudent.middleName,
            regNumber: foundStudent === null || foundStudent === void 0 ? void 0 : foundStudent.regNumber,
            class: foundStudent === null || foundStudent === void 0 ? void 0 : foundStudent.class,
            email: foundStudent === null || foundStudent === void 0 ? void 0 : foundStudent.email,
            attendance: foundStudent === null || foundStudent === void 0 ? void 0 : foundStudent.attendance,
            passportImg: foundStudent === null || foundStudent === void 0 ? void 0 : foundStudent.passportImg,
        };
        return studentDetails;
    }
    catch (err) {
        throw new Error(err);
    }
});
exports.checkStudentDetails = checkStudentDetails;
