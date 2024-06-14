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
exports.parentDetails = exports.updateDetails = exports.checkPayment = exports.validatePayment = exports.initiatePayment = exports.changeParentPassword = exports.parentLogin = void 0;
const argon2_1 = __importDefault(require("argon2"));
const jwt_config_1 = require("../config/jwt_config");
const parent_1 = require("../services/parent");
const fluterwave_1 = __importDefault(require("../config/fluterwave"));
const student_1 = require("../services/student");
const parentlogin_1 = __importDefault(require("../validation/parentlogin"));
const changepassword_1 = __importDefault(require("../validation/changepassword"));
const initiatepayment_1 = __importDefault(require("../validation/initiatepayment"));
const validatepayment_1 = __importDefault(require("../validation/validatepayment"));
const fullTermFee = 200000;
let fullTermFeeStatus = false;
const parentLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { error, isValid } = (0, parentlogin_1.default)(req.body);
        // check validation
        if (!isValid) {
            return res.status(400).json(error);
        }
        const { email, password } = req.body;
        const foundParent = yield (0, parent_1.findParentByEmail)(email);
        if (!foundParent) {
            return res.json({
                status: "failed",
                msg: "no parent found with this Email",
            });
        }
        if (foundParent.password) {
            const verifyPassword = yield argon2_1.default.verify(foundParent.password, password);
            if (!verifyPassword) {
                return res.json({
                    status: "failed",
                    msg: "incorrect password ",
                });
            }
            const token = (0, jwt_config_1.signToken)(foundParent);
            return res.json({
                status: "success",
                msg: "parent login successfuly",
                token: token,
            });
        }
        else {
            let verifyLastname = false;
            if (foundParent.lastname === password) {
                verifyLastname = true;
            }
            if (!verifyLastname) {
                return res.json({
                    status: "failed",
                    msg: "incorrect password",
                });
            }
            const token = (0, jwt_config_1.signToken)(foundParent);
            return res.json({
                status: "success",
                msg: "parent login successfuly",
                additionalMsg: "student should try and create a password to make account more secured",
                token: token,
            });
        }
    }
    catch (err) {
        return res.json({
            status: "failed",
            msg: err.message,
        });
    }
});
exports.parentLogin = parentLogin;
const changeParentPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { error, isValid } = (0, changepassword_1.default)(req.body);
        // check validation
        if (!isValid) {
            return res.status(400).json(error);
        }
        const { authorization = "" } = req.headers;
        const { password, password2 } = req.body;
        const parentId = yield (0, jwt_config_1.decodeToken)(authorization);
        const changedPassword = yield (0, parent_1.updateParentPassword)(parentId, password);
        return res.json({
            status: "success",
            msg: "password updated successfully",
        });
    }
    catch (err) {
        return res.json({
            status: "failed",
            msg: err.message,
        });
    }
});
exports.changeParentPassword = changeParentPassword;
const initiatePayment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { error, isValid } = (0, initiatepayment_1.default)(req.body);
        // check validation
        if (!isValid) {
            return res.status(400).json(error);
        }
        const { authorization = "" } = req.headers;
        const parentId = yield (0, jwt_config_1.decodeToken)(authorization);
        const { studentRegnumber, classPayedFor, termPayedFor, card_number, card_cvv, card_exp_month, card_exp_year, email, name, amount, card_pin, } = req.body;
        const foundStudent = yield (0, student_1.findByRegnumber)(studentRegnumber);
        if (!foundStudent) {
            return res.json({
                status: "failed",
                msg: "no student found with this regNumber",
            });
        }
        const tx_ref = "02" + Math.floor(Math.random() * 1000000000 + 1);
        let payload = {
            card_number: card_number,
            cvv: card_cvv,
            expiry_month: card_exp_month,
            expiry_year: card_exp_year,
            currency: "NGN",
            amount,
            fullname: name,
            email: email,
            phone_number: "09000000000",
            enckey: "FLWSECK_TEST251672747cae",
            redirect_url: "http://localhost:6500/",
            tx_ref,
        };
        const initiateCardCharge = yield fluterwave_1.default.charge.card(payload);
        if (initiateCardCharge.meta.authorization.mode === "pin") {
            let payload2 = payload;
            payload2.authorization = {
                mode: "pin",
                pin: card_pin,
            };
            if (fullTermFee > amount) {
                fullTermFeeStatus = true;
            }
            const recallCardCharge = yield fluterwave_1.default.charge.card(payload2);
            const createdPaymentCollection = yield (0, parent_1.createPayment)(foundStudent._id.toString(), studentRegnumber, parentId, tx_ref, recallCardCharge.data.flw_ref, recallCardCharge.data.id.toString(), amount, classPayedFor, termPayedFor, fullTermFeeStatus);
            return res.json({
                status: "success",
                msg: `${recallCardCharge.data.processor_response}`,
                flutterwaveResponce: recallCardCharge,
            });
        }
        if (initiateCardCharge.meta.authorization.mode === "redirect") {
            return res.json({
                status: "pending",
                msg: "card not authorized",
            });
        }
        else {
            res.json({
                status: "failed",
                msg: "card not authorized!!",
            });
        }
    }
    catch (err) {
        return res.json({
            status: "failed",
            msg: err.message,
        });
    }
});
exports.initiatePayment = initiatePayment;
const validatePayment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { error, isValid } = (0, validatepayment_1.default)(req.body);
        // check validation
        if (!isValid) {
            return res.status(400).json(error);
        }
        const { otp, flw_ref, tx_ref } = req.body;
        const chargeValidate = yield fluterwave_1.default.charge.validate({
            otp: otp,
            flw_ref: flw_ref,
        });
        if (chargeValidate.status === "success") {
            const confirmPayment = yield (0, parent_1.confirmPaymentStatus)(tx_ref, true);
            return res.json({
                status: "success",
                msg: "payment confirm successfully",
                recipt: confirmPayment,
            });
        }
        else {
            return res.json({
                status: chargeValidate.status,
                msg: "payment not confirmed",
                response: chargeValidate,
            });
        }
    }
    catch (err) {
        return res.json({
            status: "failed",
            msg: err.message,
        });
    }
});
exports.validatePayment = validatePayment;
const checkPayment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { tx_ref } = req.body;
        if (!tx_ref) {
            return res.json({
                tx_ref: "tx_ref is required",
            });
        }
        const foundPayment = yield (0, parent_1.findPaymentByTx_ref)(tx_ref);
        if (!foundPayment) {
            return res.json({
                status: "failed",
                msg: "no payment slip found with this tx_ref",
            });
        }
        if ((foundPayment === null || foundPayment === void 0 ? void 0 : foundPayment.paymentConfirmed) === true) {
            return res.json({
                status: "success",
                msg: "payment confirmed",
                slip: foundPayment,
            });
        }
        else {
            return res.json({
                status: "failed",
                msg: "payment not confirmed",
                slip: foundPayment,
            });
        }
    }
    catch (err) {
        return res.json({
            status: "failed",
            msg: err.message,
        });
    }
});
exports.checkPayment = checkPayment;
const updateDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, number } = req.body;
        const { authorization = "" } = req.headers;
        const parentId = yield (0, jwt_config_1.decodeToken)(authorization);
        const updatedDetails = yield (0, parent_1.updateParentDetails)(parentId, email, number);
        if (!updatedDetails) {
            return res.json({
                status: "failed",
                msg: "no parent found",
            });
        }
        return res.json({
            status: "success",
            msg: "details updated successfuly",
            details: updatedDetails,
        });
    }
    catch (err) {
        return res.json({
            status: "failed",
            msg: err.message,
        });
    }
});
exports.updateDetails = updateDetails;
const parentDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { authorization = "" } = req.headers;
        const parentId = yield (0, jwt_config_1.decodeToken)(authorization);
        const foundParent = yield (0, parent_1.findParentById)(parentId);
        if (!foundParent) {
            return res.json({
                status: "failed",
                msg: "no parent found",
            });
        }
        let details = {
            firstname: foundParent.firstname,
            lastname: foundParent.lastname,
            email: foundParent.email,
            Number: foundParent.mobileNumber,
            id: foundParent._id,
        };
        return res.json({
            status: "success",
            msg: "parent found",
            Details: details,
        });
    }
    catch (err) {
        return res.json({
            status: "failed",
            msg: err.message,
        });
    }
});
exports.parentDetails = parentDetails;
