// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAsS-x4GQuoQvUCzFGPD6h9HWVgPY-e_4Y",
  authDomain: "romantict.firebaseapp.com",
  projectId: "romantict",
  storageBucket: "romantict.firebasestorage.app",
  messagingSenderId: "259154632306",
  appId: "1:259154632306:web:11d8f0135610c4035a2ceb",
  measurementId: "G-BRQWEYQGM1"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const auth = getAuth(firebaseApp);
const provider = new GoogleAuthProvider();

export { auth, provider };