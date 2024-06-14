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
exports.findAdminById = exports.findByStaffnum = exports.createAdmin = void 0;
const admin_1 = __importDefault(require("../model/admin"));
const argon2_1 = __importDefault(require("argon2"));
const createAdmin = (firstname, lastname, email, password, staffnum, passportImg) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let hashPassword = yield argon2_1.default.hash(password);
        const newAdmin = yield admin_1.default.create({
            firstName: firstname,
            lastName: lastname,
            email: email,
            password: hashPassword,
            staffNum: staffnum,
            passportImg: passportImg,
        });
        return newAdmin;
    }
    catch (err) {
        throw new Error(err.message);
    }
});
exports.createAdmin = createAdmin;
const findByStaffnum = (staffnum) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const foundAdmin = yield admin_1.default.findOne({ staffNum: staffnum });
        return foundAdmin;
    }
    catch (err) {
        throw new Error(err.message);
    }
});
exports.findByStaffnum = findByStaffnum;
const findAdminById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const foundAdmin = yield admin_1.default.findById(id);
        return foundAdmin;
    }
    catch (err) {
        throw new Error(err.message);
    }
});
exports.findAdminById = findAdminById;
