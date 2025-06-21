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
exports.verifyOtp = void 0;
const axios_1 = __importDefault(require("axios"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const models_1 = require("../models");
const verifyOtp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const { email, otp, name, date } = req.body;
    if (!email || !otp || !name || !date) {
        res.status(400).json({ message: "All fields are required." });
        return;
    }
    try {
        yield axios_1.default.post(`https://${process.env.AUTH0_DOMAIN}/oauth/token`, {
            grant_type: "http://auth0.com/oauth/grant-type/passwordless/otp",
            client_id: process.env.AUTH0_CLIENT_ID,
            client_secret: process.env.AUTH0_CLIENT_SECRET,
            username: email,
            otp,
            realm: process.env.AUTH0_CONNECTION,
            scope: "openid profile email",
        }, {
            headers: {
                "content-type": "application/json",
            },
        });
        const existingUser = yield models_1.User.findOne({ email });
        if (existingUser) {
            res.status(409).json({ message: "User already exists." });
            return;
        }
        const newUser = new models_1.User({
            name,
            email,
            date,
            isgoogleuser: false,
        });
        yield newUser.save();
        const token = jsonwebtoken_1.default.sign({ id: newUser._id, email: newUser.email }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.status(200).json({
            message: "Signup successful.",
            token,
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                date: newUser.date,
            },
        });
    }
    catch (err) {
        console.error("OTP verification failed:", ((_a = err.response) === null || _a === void 0 ? void 0 : _a.data) || err);
        res
            .status(401)
            .json({ message: "Invalid or expired OTP.", error: (_b = err.response) === null || _b === void 0 ? void 0 : _b.data });
    }
});
exports.verifyOtp = verifyOtp;
