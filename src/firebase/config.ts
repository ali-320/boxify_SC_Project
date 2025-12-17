// This file is used to initialize the Firebase Admin SDK.
// It is created by the Firebase CLI when you run `firebase init functions`.

// IMPORTANT: Do not modify this file. If you need to change your Firebase
// project, use the `firebase use` command or edit the `.firebaserc` file.
import { FirebaseOptions } from 'firebase/app';

// Note: This is a placeholder configuration. The user should be prompted
// to fill this with their actual Firebase project configuration.
export const firebaseConfig: FirebaseOptions = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};
