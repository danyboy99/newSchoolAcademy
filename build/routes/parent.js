"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const parent_1 = require("../controller/parent");
const verifyToken_1 = require("../config/verifyToken");
const router = express_1.default.Router();
router.post("/login", parent_1.parentLogin);
router.post("/updatepassword", verifyToken_1.signParentToken, parent_1.changeParentPassword);
router.post("/initiatepayment", verifyToken_1.signParentToken, parent_1.initiatePayment);
router.post("/validatepayment", verifyToken_1.signParentToken, parent_1.validatePayment);
router.post("/checkpayment", verifyToken_1.signParentToken, parent_1.checkPayment);
router.put("/updatedetails", verifyToken_1.signParentToken, parent_1.updateDetails);
router.put("/details", verifyToken_1.signParentToken, parent_1.parentDetails);
exports.default = router;
