import express from "express";
import {
  createProfile,
  forgotPassword,
} from "../controllers/auth.controller.js";
import { verifyFirebaseToken } from "../middleware/verifyFirebaseToken.js";
import { checkUser } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/create-profile", verifyFirebaseToken, createProfile);
router.post("/forgot-password", forgotPassword);
router.post("/check-user", verifyFirebaseToken, checkUser);

export default router;



