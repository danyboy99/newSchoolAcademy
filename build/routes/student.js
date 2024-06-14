"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const student_1 = require("../controller/student");
const verifyToken_1 = require("../config/verifyToken");
const router = express_1.default.Router();
router.get("/", (req, res) => {
    return res.json("student index route");
});
router.post("/login", student_1.login);
router.get("/details", verifyToken_1.signStudentToken, student_1.studentDetails);
router.post("/updatepassword", verifyToken_1.signStudentToken, student_1.changePassword);
router.get("/notification", verifyToken_1.signStudentToken, student_1.checkStudentNotification);
router.post("/termresult", verifyToken_1.signStudentToken, student_1.checkStudentTermResult);
router.get("/results", verifyToken_1.signStudentToken, student_1.checkStudentResults);
exports.default = router;
