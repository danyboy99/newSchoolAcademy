"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const flutterwave_node_v3_1 = __importDefault(require("flutterwave-node-v3"));
const flw = new flutterwave_node_v3_1.default("FLWPUBK_TEST-d8a5d2c77fd8d4ecfcfca5d95161e06b-X", "FLWSECK_TEST-42c6b907b1087f5d1a51e8602cabe713-X");
exports.default = flw;
