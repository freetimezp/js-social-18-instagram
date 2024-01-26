import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyB9EkTT6c_whFwVhXOe1Z6uSvtXPhRFt6k",
    authDomain: "social-insta-18.firebaseapp.com",
    projectId: "social-insta-18",
    storageBucket: "social-insta-18.appspot.com",
    messagingSenderId: "698673746592",
    appId: "1:698673746592:web:e8e6bca2cd097355736fc5",
    measurementId: "G-1DM4Q29R8V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { app, auth, firestore, storage };
