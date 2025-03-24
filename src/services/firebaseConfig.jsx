// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBFf83ilFrk-5SHyFoDVSbx5fPik9IHRd4",
  authDomain: "ai-trip-planner-96801.firebaseapp.com",
  projectId: "ai-trip-planner-96801",
  storageBucket: "ai-trip-planner-96801.firebasestorage.app",
  messagingSenderId: "676017971588",
  appId: "1:676017971588:web:838e7dd31541171bd67dd1",
  measurementId: "G-6VKE7QV5YY"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
// const analytics = getAnalytics(app);