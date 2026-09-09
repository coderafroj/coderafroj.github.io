// Firebase client initialization.
// All values come from NEXT_PUBLIC_* env vars — see .env.local.example.
// These are safe to expose in the browser bundle; real access control lives
// in Firestore Security Rules (see firestore.rules) and Firebase Auth.
//
// Designed to fail SOFT: if env vars aren't set yet (e.g. first deploy,
// or `next build` running before .env is configured), the public site
// still builds and renders using seed data — only the admin panel and
// live data require real Firebase config.

import { initializeApp, getApps, getApp, type FirebaseOptions } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";
import { getAnalytics, isSupported, type Analytics } from "firebase/analytics";

const firebaseConfig: FirebaseOptions = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

export const isFirebaseConfigured = Boolean(
  firebaseConfig.apiKey && firebaseConfig.projectId
);

let authInstance: Auth | null = null;
let dbInstance: Firestore | null = null;
let analyticsInstance: Analytics | null = null;

if (isFirebaseConfigured) {
  const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
  authInstance = getAuth(app);
  dbInstance = getFirestore(app);

  // Analytics only works in the browser (needs window) and only if the
  // browser supports it — never touch it during server-side rendering.
  if (typeof window !== "undefined") {
    isSupported().then((supported) => {
      if (supported) analyticsInstance = getAnalytics(app);
    });
  }
}

export const auth = authInstance;
export const db = dbInstance;
export function getAnalyticsInstance(): Analytics | null {
  return analyticsInstance;
}
