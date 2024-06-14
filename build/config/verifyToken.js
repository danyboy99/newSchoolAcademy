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
exports.signParentToken = exports.signStudentToken = exports.signAdminToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwt_config_1 = require("./jwt_config");
const admin_1 = require("../services/admin");
const student_1 = require("../services/student");
const parent_1 = require("../services/parent");
const signAdminToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { authorization = "" } = req.headers;
        const decode = jsonwebtoken_1.default.verify(authorization, jwt_config_1.jwt_secret);
        let foundId = decode.user;
        const foundAdmin = yield (0, admin_1.findAdminById)(foundId);
        if (!foundAdmin) {
            return res.json({
                status: "failed",
                msg: "user not authorized",
            });
        }
        return next();
    }
    catch (err) {
        return res.json({
            status: "failed",
            msg: err.message,
        });
    }
});
exports.signAdminToken = signAdminToken;
const signStudentToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { authorization = "" } = req.headers;
        const decode = jsonwebtoken_1.default.verify(authorization, jwt_config_1.jwt_secret);
        let foundId = decode.user;
        const foundStudent = yield (0, student_1.findStudentById)(foundId);
        if (!foundStudent) {
            return res.json({
                status: "failed",
                msg: "user not authorized",
            });
        }
        return next();
    }
    catch (err) {
        return res.json({
            status: "failed",
            msg: err.message,
        });
    }
});
exports.signStudentToken = signStudentToken;
const signParentToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { authorization = "" } = req.headers;
        const decode = jsonwebtoken_1.default.verify(authorization, jwt_config_1.jwt_secret);
        let foundId = decode.user;
        const foundParent = yield (0, parent_1.findParentById)(foundId);
        if (!foundParent) {
            return res.json({
                status: "failed",
                msg: "user not authorized",
            });
        }
        return next();
    }
    catch (err) {
        return res.json({
            status: "failed",
            msg: err.message,
        });
    }
});
exports.signParentToken = signParentToken;
