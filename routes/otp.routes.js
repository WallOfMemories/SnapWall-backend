import express from "express";
import { sendOtp, verifyOtp } from "../controllers/otp.controller.js";
import { otpLimiter, otpVerifyLimiter } from "../middleware/rateLimit.js";

const router = express.Router();

router.post("/send", otpLimiter, sendOtp);
router.post("/verify", otpVerifyLimiter, verifyOtp);

export default router;
