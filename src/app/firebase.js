// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDpUdXL8dHmZC4SNXme8SWn0tmc3fA8euo",
  authDomain: "inventory-management-app-e7ff5.firebaseapp.com",
  projectId: "inventory-management-app-e7ff5",
  storageBucket: "inventory-management-app-e7ff5.appspot.com",
  messagingSenderId: "1048946366565",
  appId: "1:1048946366565:web:e06a87f31e7476a4a38e8c",
  measurementId: "G-FF23KH33K4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const analytics = getAnalytics(app);

export { firestore, analytics };
