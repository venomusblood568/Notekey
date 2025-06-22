import express from "express";
import {requestOtp} from "../controller/request-otp";
import {verifyOtp} from "../controller/verify-otp";
import {signinWithOtp} from "../controller/signin";
const router = express.Router();

router.post("/request-otp", requestOtp);
router.post("/verify-otp", verifyOtp);
router.post("/signin-otp", signinWithOtp);
export default router;
