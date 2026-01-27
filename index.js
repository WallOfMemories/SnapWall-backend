import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

import otpRoutes from "./routes/otp.routes.js";
import authRoutes from "./routes/auths.routes.js";
import promotionRoutes from "./routes/promotion.routes.js";

const app = express();

app.use(express.json());

// ✅ Allow Vercel frontend later
app.use(
  cors({
    origin: [
      "http://localhost:5173",
    ],
    credentials: true
  })
);

app.get("/", (req, res) => {
  res.send("Backend running on Vercel 🚀");
});

app.use("/api/otp", otpRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/promotions", promotionRoutes);

export default app;
