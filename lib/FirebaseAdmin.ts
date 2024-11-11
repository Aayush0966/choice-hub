// lib/firebaseAdmin.js
import admin from 'firebase-admin';

if (typeof process.env.FIREBASE_ADMIN_SDK_KEY !== 'string') {
  throw new Error('FIREBASE_ADMIN_SDK_KEY is not defined or is not a string');
}

const serviceAccount = JSON.parse(process.env.FIREBASE_ADMIN_SDK_KEY);

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: `https://${process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID}.firebaseio.com`,
  });
}

export const adminAuth = admin.auth();
export const adminDb = admin.firestore();
