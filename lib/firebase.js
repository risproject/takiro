// lib/firebase.js
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  // Ingat: Minta temanmu mengisi bagian "apiKey" dsb dari config web dia
  apiKey: "AIzaSyBDAV-FdmkC9WNJi7HzlqX9THHnJY4-cS0",
  authDomain: "Ijtech-sgh.firebaseapp.com",
  databaseURL: "https://jtech-sgh-default-rtdb.asia-southeast1.firebasedatabase.app", // Ini sudah benar
  projectId: "jtech-sgh",
  storageBucket: "jtech-sgh.firebasestorage.app",
  messagingSenderId: "55389201130",
  appId: "1:55389201130:web:617cee8cd084c715c1ad93",
  measurementId: "G-D12MJM672Z"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);