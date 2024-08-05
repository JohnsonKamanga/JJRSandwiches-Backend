// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDy-QKype_mfyWqiBcuEdjH659kDje54RU",
  authDomain: "jjrsandwiches.firebaseapp.com",
  projectId: "jjrsandwiches",
  storageBucket: "jjrsandwiches.appspot.com",
  messagingSenderId: "780495212550",
  appId: "1:780495212550:web:ad2c3d1e99a20585463387",
  measurementId: "G-GZEK56JTMC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);