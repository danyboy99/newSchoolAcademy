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
exports.checkResults = exports.checkResult = exports.updateResult = exports.createResult = void 0;
const result_1 = __importDefault(require("../model/result"));
const createResult = (studentRegNumber, classResult, term, result) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let newResult = new result_1.default();
        newResult.studentRegNumber = studentRegNumber;
        newResult.classResult = classResult;
        newResult.termResult = term;
        newResult.result = result;
        yield newResult.save();
        return newResult;
    }
    catch (err) {
        throw new Error(err.message);
    }
});
exports.createResult = createResult;
const updateResult = (studentRegNumber, classResult, term, result) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const foundResult = yield result_1.default.findOne({
            studentRegNumber: studentRegNumber,
            classResult: classResult,
            termResult: term,
        });
        if (!foundResult) {
            throw new Error("no result found with this cridentials");
        }
        foundResult.result = result;
        foundResult.save().then((data) => {
            return data;
        });
    }
    catch (err) {
        throw new Error(err.message);
    }
});
exports.updateResult = updateResult;
const checkResult = (regnumber, classResult, termResult) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const foundResult = yield result_1.default.findOne({
            studentRegNumber: regnumber,
            classResult,
            termResult: termResult,
        });
        return foundResult;
    }
    catch (err) {
        throw new Error(err.message);
    }
});
exports.checkResult = checkResult;
const checkResults = (regnumber) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const foundResult = yield result_1.default.find({
            studentRegNumber: regnumber,
        });
        return foundResult;
    }
    catch (err) {
        throw new Error(err.message);
    }
});
exports.checkResults = checkResults;
