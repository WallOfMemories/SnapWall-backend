import admin from "firebase-admin";

const serviceAccount = JSON.parse(
  process.env.FIREBASE_SERVICE_ACCOUNT
);

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