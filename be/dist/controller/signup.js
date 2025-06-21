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
exports.signup = void 0;
const models_1 = require("../models");
const axios_1 = __importDefault(require("axios"));
const tokenmanger_1 = require("../utils/tokenmanger");
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const { name, email, date } = req.body;
    if (!name || !email || !date) {
        return res.status(400).json({ message: "All fields are required" });
    }
    try {
        const existing = yield models_1.User.findOne({ email });
        if (existing) {
            return res
                .status(409)
                .json({
                message: "OTP already sent to this email. Try again in a few minutes.",
            });
        }
        yield models_1.User.create({ name, email, dob: date });
        const token = yield (0, tokenmanger_1.getManagementToken)();
        yield axios_1.default.post(`https://${process.env.AUTH0_DOMAIN}/passwordless/start`, {
            connection: process.env.AUTH0_CONNECTION,
            send: "code",
            email,
        }, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });
        return res.status(200).json({ message: "OTP sent to email." });
    }
    catch (err) {
        console.error("OTP send error:", ((_a = err.response) === null || _a === void 0 ? void 0 : _a.data) || err.message);
        return res
            .status(500)
            .json({ message: "OTP failed to send", error: (_b = err.response) === null || _b === void 0 ? void 0 : _b.data });
    }
});
exports.signup = signup;
