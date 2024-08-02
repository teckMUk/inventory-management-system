
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


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
const auth = getAuth(app)

export {firestore,auth};


// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional


// Initialize Firebase
