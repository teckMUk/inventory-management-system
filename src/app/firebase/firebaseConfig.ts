
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Replace these values with your Firebase project's config values
// const firebaseConfig = {
//   apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
//   authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
//   measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
// };
const firebaseConfig = {
  apiKey: "AIzaSyDRtnCi0egRP728MpQdLI67REN2-Wv1lDs",
  authDomain: "inventory-management-sys-80cf6.firebaseapp.com",
  projectId: "inventory-management-sys-80cf6",
  storageBucket: "inventory-management-sys-80cf6.appspot.com",
  messagingSenderId: "722156979649",
  appId: "1:722156979649:web:b76cf4963497dcd6d3db40",
  measurementId: "G-5XVM1Q070L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase services
const firestore = getFirestore(app);

export {firestore};


// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional


// Initialize Firebase
