// src/services/firebase.ts
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBJJd8av7Zs1AXv0z1zGxyoR7Urse8391E",
  authDomain: "feedbackhub-83b2d.firebaseapp.com",
  projectId: "feedbackhub-83b2d",
  storageBucket: "feedbackhub-83b2d.firebasestorage.app",
  messagingSenderId: "335214134775",
  appId: "1:335214134775:web:95ea5cc4d0ed585d2b5af2"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
