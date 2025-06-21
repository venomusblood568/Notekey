import express from "express";
import {requestOtp} from "../controller/request-otp";
import {verifyOtp} from "../controller/verify-otp";

const router = express.Router();

router.post("/request-otp", requestOtp);
router.post("/verify-otp", verifyOtp);

export default router;
