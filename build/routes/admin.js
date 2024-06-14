"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const admin_1 = require("../controller/admin");
const verifyToken_1 = require("../config/verifyToken");
const router = express_1.default.Router();
router.get("/", (req, res) => {
    return res.json("student index route");
});
router.post("/login", admin_1.login);
router.post("/signup", admin_1.signUp);
router.post("/createstudentacc", verifyToken_1.signAdminToken, admin_1.createStudentAcc);
router.post("/createstudentresult", verifyToken_1.signAdminToken, admin_1.createStudentResult);
router.put("/updateresult", verifyToken_1.signAdminToken, admin_1.updateStudentResult);
router.post("/getstudentresult", verifyToken_1.signAdminToken, admin_1.checkStudentResult);
router.post("/generalnotification", verifyToken_1.signAdminToken, admin_1.newGeneralNotification);
router.post("/studentnotification", verifyToken_1.signAdminToken, admin_1.newStudentNotification);
router.get("/checknotification", verifyToken_1.signAdminToken, admin_1.checkGeneralNotification);
router.post("/sendgeneralemail", verifyToken_1.signAdminToken, admin_1.sendGeneralMail);
router.post("/sendsinglemail", verifyToken_1.signAdminToken, admin_1.sendPersonalMail);
exports.default = router;
