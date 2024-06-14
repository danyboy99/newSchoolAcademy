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
exports.sendMail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
console.log("envFile:", {
    user: process.env.user,
    pass: process.env.pass,
});
const transporter = nodemailer_1.default.createTransport({
    host: "smtp.google.com",
    port: 587,
    auth: {
        user: process.env.user,
        pass: process.env.pass,
    },
});
const sendMail = (Option) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const info = yield transporter.sendMail({
            from: Option.from,
            to: Option.to,
            subject: Option.subject,
            text: Option.text,
        });
        console.log("message sent:", info);
        return info.messageId;
    }
    catch (err) {
        throw new Error(err.message);
    }
});
exports.sendMail = sendMail;
