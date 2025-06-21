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
exports.requestOtp = void 0;
const axios_1 = __importDefault(require("axios"));
const requestOtp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const { email } = req.body;
    if (!email) {
        res.status(400).json({ message: "Email is required." });
        return;
    }
    try {
        yield axios_1.default.post(`https://${process.env.AUTH0_DOMAIN}/passwordless/start`, {
            client_id: process.env.AUTH0_CLIENT_ID,
            client_secret: process.env.AUTH0_CLIENT_SECRET,
            connection: process.env.AUTH0_CONNECTION,
            email,
            send: "code",
        }, {
            headers: {
                "content-type": "application/json",
            },
        });
        res.status(200).json({ message: "OTP sent to email." });
    }
    catch (error) {
        console.error("OTP send error:", ((_a = error.response) === null || _a === void 0 ? void 0 : _a.data) || error);
        res
            .status(500)
            .json({ message: "OTP send failed", error: (_b = error.response) === null || _b === void 0 ? void 0 : _b.data });
    }
});
exports.requestOtp = requestOtp;
