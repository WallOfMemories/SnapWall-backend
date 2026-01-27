import { SendVerificationCode } from "../middleware/Email.js";

const otpStore = new Map(); // DEV ONLY

export const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email)
      return res.status(400).json({ message: "Email required" });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    console.log("Generated OTP:", otp);

    otpStore.set(email, {
      otp,
      expiresAt: Date.now() + 5 * 60 * 1000,
    });

    await SendVerificationCode(email, otp);

    res.json({ success: true, message: "OTP sent" });
  } catch (err) {
    res.status(500).json({ message: "Failed to send OTP" });
  }
};

export const verifyOtp = (req, res) => {
  const { email, otp } = req.body;
  const record = otpStore.get(email);

  if (!record)
    return res.status(400).json({ message: "OTP not found" });

  if (record.expiresAt < Date.now())
    return res.status(400).json({ message: "OTP expired" });

  if (record.otp !== otp)
    return res.status(400).json({ message: "Invalid OTP" });

  otpStore.delete(email);
  res.json({ success: true, message: "OTP verified" });
};
