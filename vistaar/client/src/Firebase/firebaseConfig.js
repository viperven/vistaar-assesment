// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCwyDq_F5elmgEz9SI0PW3DWB1GN9sDqzI",
  authDomain: "vistaar-d3d50.firebaseapp.com",
  projectId: "vistaar-d3d50",
  storageBucket: "vistaar-d3d50.appspot.com",
  messagingSenderId: "62161903116",
  appId: "1:62161903116:web:2b2c8693dfa2c0b0081829",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const database = getAuth(app);
