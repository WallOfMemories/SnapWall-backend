import { db } from "../src/firebase.js";
import { WelcomeEmail } from "../middleware/Email.js";
import admin from "../src/firebase.js";
import { transporter } from "../middleware/Email.config.js";

export const createProfile = async (req, res) => {
  try {
    console.log("CREATE PROFILE HIT");
    const { uid, email, username, instagram, imageUrl } = req.body;

    if (!uid || !email || !username || !imageUrl) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    await db.collection("users").doc(uid).set({
      email,
      username,
      instagram,
      imageUrl,
      createdAt: Date.now(),
    });

    await WelcomeEmail(email, username);

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};


const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

/* =========================
   FORGOT PASSWORD
========================= */
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // 1️⃣ Validate email
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    // 2️⃣ Check if user exists in Firebase
    await admin.auth().getUserByEmail(email);

    // 3️⃣ Generate reset link
    const resetLink = await admin
      .auth()
      .generatePasswordResetLink(email);

    // 4️⃣ Send email
    await transporter.sendMail({
      from: `"SnapWall" <snapwall.official@gmail.com>`,
      to: email,
      subject: "Reset your SnapWall password",
      html: `
        <div style="font-family:Arial;max-width:520px;margin:auto">
          <h2>Password Reset</h2>
          <p>Click the button below to reset your password.</p>
          <a href="${resetLink}"
             style="display:inline-block;padding:12px 20px;
             background:#000;color:#fff;border-radius:6px;
             text-decoration:none">
             Reset Password
          </a>
          <p style="margin-top:20px;font-size:12px;color:#777">
            If you didn’t request this, ignore this email.
          </p>
        </div>
      `,
    });

    res.json({
      success: true,
      message: "Password reset link sent",
    });
  } catch (err) {
    console.error("FORGOT PASSWORD ERROR:", err);

    // Firebase specific error
    if (err.code === "auth/user-not-found") {
      return res
        .status(404)
        .json({ message: "No account found with this email" });
    }

    res.status(500).json({
      message: "Failed to send reset link",
    });
  }
};
