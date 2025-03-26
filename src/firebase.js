// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, initializeFirestore, persistentLocalCache, persistentMultipleTabManager } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCSUMqB2SjgSsY1LtfX7sJz8okt3-Qsptg",
  authDomain: "stttdumpd.firebaseapp.com",
  projectId: "stttdumpd",
  storageBucket: "stttdumpd.firebasestorage.app",
  messagingSenderId: "796906381488",
  appId: "1:796906381488:web:e927283f23431d2ba65b75"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// ✅ Initialize Firestore with persistence
const db = initializeFirestore(app, {
  localCache: persistentLocalCache({ tabManager: persistentMultipleTabManager() }),
});

export { db }

