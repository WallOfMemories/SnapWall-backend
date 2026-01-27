import admin from "../src/firebase.js";

export const verifyFirebaseToken = async (req, res, next) => {
  console.log("VERIFY TOKEN MIDDLEWARE HIT");

  const authHeader = req.headers.authorization;


  if (!authHeader) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = await admin.auth().verifyIdToken(token);
    req.user = decoded;
    next();
  } catch (err) {
    console.error("TOKEN ERROR:", err);
    res.status(401).json({ message: "Invalid token" });
  }
};


