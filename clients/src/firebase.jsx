// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-auth-4375f.firebaseapp.com",
  projectId: "mern-auth-4375f",
  storageBucket: "mern-auth-4375f.appspot.com",
  messagingSenderId: "737380063173",
  appId: "1:737380063173:web:b2574bfc355d1efaa99dac",
  measurementId: "G-C7E357FD92"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);