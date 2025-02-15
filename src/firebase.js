// firebase.js
import { initializeApp, getApps, getApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// Firebase configuration (replace with your own Firebase project's config)
const firebaseConfig = {
  apiKey: "AIzaSyDPgfjl9C5IYQFQSdMgJe9YH6ygly3SdA0",
  authDomain: "iot-based-home-automatio-41351.firebaseapp.com",
  databaseURL: "https://iot-based-home-automatio-41351-default-rtdb.firebaseio.com",
  projectId: "iot-based-home-automatio-41351",
  storageBucket: "iot-based-home-automatio-41351.appspot.com",
  messagingSenderId: "169730720352",
  appId: "1:169730720352:web:c98e0f84928cb2d4e5f905",
  measurementId: "G-2Z8VC4M3YE"
};

// Initialize Firebase only if it hasn't been initialized already
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Initialize the Realtime Database
const database = getDatabase(app);

// Export the database for use in other parts of the app
export { database };
