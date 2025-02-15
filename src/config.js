// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDPgfjl9C5IYQFQSdMgJe9YH6ygly3SdA0",
  authDomain: "iot-based-home-automatio-41351.firebaseapp.com",
  projectId: "iot-based-home-automatio-41351",
  storageBucket: "iot-based-home-automatio-41351.firebasestorage.app",
  messagingSenderId: "169730720352",
  appId: "1:169730720352:web:c98e0f84928cb2d4e5f905",
  measurementId: "G-2Z8VC4M3YE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

export { app, auth, database };
