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
exports.signinWithOtp = void 0;
const axios_1 = __importDefault(require("axios"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const models_1 = require("../models");
const signinWithOtp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e;
    const { email, otp } = req.body;
    if (!email || !otp) {
        res.status(400).json({ message: "Email and OTP are required." });
        return;
    }
    try {
        // Verify OTP with Auth0
        const tokenResponse = yield axios_1.default.post(`https://${process.env.AUTH0_DOMAIN}/oauth/token`, {
            grant_type: "http://auth0.com/oauth/grant-type/passwordless/otp",
            client_id: process.env.AUTH0_CLIENT_ID,
            client_secret: process.env.AUTH0_CLIENT_SECRET,
            username: email,
            otp: otp,
            realm: process.env.AUTH0_CONNECTION,
            scope: "openid profile email",
        }, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        // If OTP verification is successful
        const accessToken = tokenResponse.data.access_token;
        // Get user profile from Auth0
        const userInfo = yield axios_1.default.get(`https://${process.env.AUTH0_DOMAIN}/userinfo`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        const auth0Email = userInfo.data.email;
        // Verify email matches
        if (auth0Email !== email) {
            res.status(400).json({ message: "Email mismatch error." });
            return;
        }
        // Find user in our database
        const user = yield models_1.User.findOne({ email: auth0Email });
        if (!user) {
            res.status(404).json({ message: "User not found." });
            return;
        }
        // Generate JWT token for our application
        const appToken = jsonwebtoken_1.default.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.status(200).json({
            token: appToken,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
            },
        });
    }
    catch (err) {
        console.error("Error verifying OTP:", ((_a = err.response) === null || _a === void 0 ? void 0 : _a.data) || err);
        if (((_b = err.response) === null || _b === void 0 ? void 0 : _b.status) === 403 || ((_c = err.response) === null || _c === void 0 ? void 0 : _c.status) === 400) {
            res.status(400).json({
                message: "Invalid OTP",
                error: ((_d = err.response) === null || _d === void 0 ? void 0 : _d.data) || err.message,
            });
        }
        else {
            res.status(500).json({
                message: "Failed to verify OTP.",
                error: ((_e = err.response) === null || _e === void 0 ? void 0 : _e.data) || err.message,
            });
        }
    }
});
exports.signinWithOtp = signinWithOtp;
