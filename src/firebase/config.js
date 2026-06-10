// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAzImkXb9tFDTKfVn8lwdXkKlMTGRqGibs",
  authDomain: "mcewan-rn-clase3.firebaseapp.com",
  projectId: "mcewan-rn-clase3",
  storageBucket: "mcewan-rn-clase3.firebasestorage.app",
  messagingSenderId: "357246266386",
  appId: "1:357246266386:web:bb1b085978a18998997ccb",
  measurementId: "G-5FRF9F1VET"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);