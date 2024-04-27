import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyASgGVhLYtDhHANsGVicRYK20mF0JKDHoo",
  authDomain: "amazin-project-48294.firebaseapp.com",
  projectId: "amazin-project-48294",
  storageBucket: "amazin-project-48294.appspot.com",
  messagingSenderId: "436803090250",
  appId: "1:436803090250:web:3d64dd0b3bc808609c73b3",
  measurementId: "G-97FJVG6EWR"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Initialize Firestore using the firebaseApp instance
const db = getFirestore(firebaseApp);

// Initialize Authentication using the firebaseApp instance
const auth = getAuth(firebaseApp);

export { db, auth };