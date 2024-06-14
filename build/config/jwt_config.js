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
exports.decodeToken = exports.signToken = exports.jwt_secret = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.jwt_secret = "omotehinse";
const signToken = (user) => {
    const payload = {
        user: user.id,
        email: user.email,
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 2,
    };
    return jsonwebtoken_1.default.sign(payload, exports.jwt_secret);
};
exports.signToken = signToken;
const decodeToken = (authorization) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const decode = jsonwebtoken_1.default.verify(authorization, exports.jwt_secret);
        return decode.user;
    }
    catch (err) {
        throw new Error(err.message);
    }
});
exports.decodeToken = decodeToken;
