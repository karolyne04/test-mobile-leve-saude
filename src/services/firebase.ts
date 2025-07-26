// src/services/firebase.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, inMemoryPersistence, setPersistence } from "firebase/auth";

import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';

// Importar variáveis de ambiente com fallback
const FIREBASE_API_KEY = process.env.FIREBASE_API_KEY || "AIzaSyBJJd8av7Zs1AXv0z1zGxyoR7Urse8391E";
const FIREBASE_AUTH_DOMAIN = process.env.FIREBASE_AUTH_DOMAIN || "feedbackhub-83b2d.firebaseapp.com";
const FIREBASE_PROJECT_ID = process.env.FIREBASE_PROJECT_ID || "feedbackhub-83b2d";
const FIREBASE_STORAGE_BUCKET = process.env.FIREBASE_STORAGE_BUCKET || "feedbackhub-83b2d.firebasestorage.app";
const FIREBASE_MESSAGING_SENDER_ID = process.env.FIREBASE_MESSAGING_SENDER_ID || "335214134775";
const FIREBASE_APP_ID = process.env.FIREBASE_APP_ID || "1:335214134775:web:95ea5cc4d0ed585d2b5af2";

const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_AUTH_DOMAIN,
  projectId: FIREBASE_PROJECT_ID,
  storageBucket: FIREBASE_STORAGE_BUCKET,
  messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
  appId: FIREBASE_APP_ID,
};

// Inicializa o app
const app = initializeApp(firebaseConfig);

// Inicializa o auth

const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});



const db = getFirestore(app);

export { auth, db };
