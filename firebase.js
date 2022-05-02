// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { GoogleAuthProvider, getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCwffP0f1BXQzuViv0fEs8Shv8jSRmSebQ",
  authDomain: "blog-app-vue-43fc2.firebaseapp.com",
  projectId: "blog-app-vue-43fc2",
  storageBucket: "blog-app-vue-43fc2.appspot.com",
  messagingSenderId: "86052787026",
  appId: "1:86052787026:web:0175bbebbe7e1fb565a08b",
  measurementId: "G-EBJ59EHM70"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const provider = new GoogleAuthProvider()
const auth = getAuth()
const db = getFirestore()
const storage = getStorage()

export { app, db, auth, provider, storage }
