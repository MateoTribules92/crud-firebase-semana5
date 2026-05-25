import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyANJ2jY-07RkMqiAAKfbycxr-uEUVh6Q8c",
  authDomain: "species-app-93e42.firebaseapp.com",
  projectId: "species-app-93e42",
  storageBucket: "species-app-93e42.firebasestorage.app",
  messagingSenderId: "596276449806",
  appId: "1:596276449806:web:ec5f3df5a6cd604449e25f",
  databaseURL:"https://species-app-93e42-default-rtdb.firebaseio.com/"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Realtime Database and get a reference to the service
export const db = getDatabase(app);
export const storage = getStorage(app);