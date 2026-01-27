import { db } from "../src/firebase.js";
import { SendPromotionEmail } from "../middleware/Email.js";

export const submitPromotion = async (req, res) => {
  try {
    const { fullName, email, contact, address, message } = req.body;

    if (!fullName || !email || !contact || !address || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // 🔥 Save to Firestore
    await db.collection("promotions").add({
      fullName,
      email,
      contact,
      address,
      message,
      createdAt: Date.now(),
      status: "pending",
    });

    // 📧 Send email to admin
    await SendPromotionEmail({
      fullName,
      email,
      contact,
      address,
      message,
    });

    res.json({ success: true, message: "Promotion submitted successfully" });
  } catch (error) {
    console.error("PROMOTION ERROR:", error);
    res.status(500).json({ message: "Failed to submit promotion" });
  }
};
