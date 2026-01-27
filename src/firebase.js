import admin from "firebase-admin";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const serviceAccount = require("../serviceAccountKey.json");

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  });
}

export default admin;
export const auth = admin.auth();
export const db = admin.firestore();
export const bucket = process.env.FIREBASE_STORAGE_BUCKET
  ? admin.storage().bucket(process.env.FIREBASE_STORAGE_BUCKET)
  : null;
