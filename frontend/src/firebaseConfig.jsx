// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBPE6TbZykGf7Kui6fsR6-3W9w6uuzg0ms",
  authDomain: "login-12d02.firebaseapp.com",
  projectId: "login-12d02",
  storageBucket: "login-12d02.appspot.com",
  messagingSenderId: "894912184495",
  appId: "1:894912184495:web:2a6fadb14356c49b24545a",
  measurementId: "G-G9XVZSVL5Y",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
