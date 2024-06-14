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
exports.updateParentDetails = exports.confirmPaymentStatus = exports.findPaymentByTx_ref = exports.updateParentPassword = exports.findParentById = exports.createPayment = exports.findParentByEmail = exports.getAllParentMail = exports.addStudentToParent = exports.findParentByFirstLastName = exports.findParentBychildren = exports.createParent = void 0;
const parent_1 = __importDefault(require("../model/parent"));
const payment_1 = __importDefault(require("../model/payment"));
const argon2_1 = __importDefault(require("argon2"));
const createParent = (firstname, lastname, email, mobileNumber, childRegNumber) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newParent = new parent_1.default();
        newParent.firstname = firstname;
        newParent.lastname = lastname;
        newParent.email = email;
        newParent.mobileNumber = mobileNumber;
        newParent.childrenRegNumber.push(childRegNumber);
        yield newParent.save();
        return newParent;
    }
    catch (err) {
        throw new Error(err);
    }
});
exports.createParent = createParent;
const findParentBychildren = (regNumber) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const foundParent = yield parent_1.default.findOne({ childrenRegNumber: regNumber });
        return foundParent;
    }
    catch (err) {
        throw new Error(err);
    }
});
exports.findParentBychildren = findParentBychildren;
const findParentByFirstLastName = (firstname, lastname) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const foundParent = yield parent_1.default.findOne({
            firstname: firstname,
            lastname: lastname,
        });
        return foundParent;
    }
    catch (err) {
        throw new Error(err);
    }
});
exports.findParentByFirstLastName = findParentByFirstLastName;
const addStudentToParent = (regnumber, parentId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const foundParent = yield parent_1.default.findOne({ _id: parentId });
        foundParent === null || foundParent === void 0 ? void 0 : foundParent.childrenRegNumber.push(regnumber);
        yield (foundParent === null || foundParent === void 0 ? void 0 : foundParent.save());
        return foundParent;
    }
    catch (err) {
        throw new Error(err);
    }
});
exports.addStudentToParent = addStudentToParent;
const getAllParentMail = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allParent = yield parent_1.default.find();
        let parentEmail = [];
        allParent.forEach((parent) => {
            parentEmail.push(parent.email);
        });
        return parentEmail;
    }
    catch (err) {
        throw new Error(err);
    }
});
exports.getAllParentMail = getAllParentMail;
const findParentByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const foundParent = yield parent_1.default.findOne({ email: email });
        return foundParent;
    }
    catch (err) {
        throw new Error(err);
    }
});
exports.findParentByEmail = findParentByEmail;
const createPayment = (studentId, studentRegnum, parent, tx_ref, flw_ref, paymentId, amount, classPayedFor, termPayedFor, fullPayment) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const createdPayment = yield payment_1.default.create({
            student: studentId,
            studentRegnumber: studentRegnum,
            parent: parent,
            paymentTx_ref: tx_ref,
            paymentFlw_ref: flw_ref,
            paymentId: paymentId,
            paymentConfirmed: false,
            paymentCompleted: fullPayment,
            amount: amount,
            classPayedFor: classPayedFor,
            termPayedFor: termPayedFor,
        });
        return createdPayment;
    }
    catch (err) {
        throw new Error(err);
    }
});
exports.createPayment = createPayment;
const findParentById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const foundParent = yield parent_1.default.findById(id);
        return foundParent;
    }
    catch (err) {
        throw new Error(err);
    }
});
exports.findParentById = findParentById;
const updateParentPassword = (parentId, password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const foundParent = yield parent_1.default.findById(parentId);
        let hashPassword = yield argon2_1.default.hash(password);
        foundParent.password = hashPassword;
        yield foundParent.save();
        return foundParent;
    }
    catch (err) {
        throw new Error(err.message);
    }
});
exports.updateParentPassword = updateParentPassword;
const findPaymentByTx_ref = (tx_ref) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const foundPayment = yield payment_1.default.findOne({ paymentTx_ref: tx_ref });
        return foundPayment;
    }
    catch (err) {
        throw new Error(err.message);
    }
});
exports.findPaymentByTx_ref = findPaymentByTx_ref;
const confirmPaymentStatus = (tx_ref, status) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (status === true) {
            let foundPayment = yield payment_1.default.findOne({ paymentTx_ref: tx_ref });
            foundPayment.paymentConfirmed = true;
            yield foundPayment.save();
            return foundPayment;
        }
        else {
            let foundPayment = yield payment_1.default.findOne({ paymentTx_ref: tx_ref });
            return foundPayment;
        }
    }
    catch (err) {
        throw new Error(err.message);
    }
});
exports.confirmPaymentStatus = confirmPaymentStatus;
const updateParentDetails = (parentId, email, number) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let foundParent = yield parent_1.default.findById(parentId);
        foundParent.email = email;
        foundParent.mobileNumber = number;
        yield foundParent.save();
        return foundParent;
    }
    catch (err) {
        throw new Error(err.message);
    }
});
exports.updateParentDetails = updateParentDetails;
