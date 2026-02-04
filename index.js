import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import authRoutes from "./routes/auths.routes.js";
import promotionRoutes from "./routes/promotion.routes.js";

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "https://snap-wall.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.options("*", cors());

app.get("/", (req, res) => {
  res.send("Backend running on Vercel 🚀");
});

app.use("/api/auth", authRoutes);
app.use("/api/promotions", promotionRoutes);

export default app;
