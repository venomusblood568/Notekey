"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const request_otp_1 = require("../controller/request-otp");
const verify_otp_1 = require("../controller/verify-otp");
const router = express_1.default.Router();
router.post("/request-otp", request_otp_1.requestOtp);
router.post("/verify-otp", verify_otp_1.verifyOtp);
exports.default = router;
