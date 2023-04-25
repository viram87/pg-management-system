// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
// import { getStorage } from "firebase/firebase-storage"

const firebaseConfig = {
  apiKey: "AIzaSyBMx_5GYb4S9HY7M2AVvGqjudrH2EKuZv0",
  authDomain: "viram-pg.firebaseapp.com",
  projectId: "viram-pg",
  storageBucket: "viram-pg.appspot.com",
  messagingSenderId: "1050368615952",
  appId: "1:1050368615952:web:1e1163a3ae9eef1f9ecc95",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { db, auth, storage };
