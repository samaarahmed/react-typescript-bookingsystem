// Import the functions you need from the SDKs you need
import {initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBWThrHCGlanxuzaURHZR5M1Wu-btyUC2Y",
  authDomain: "steadafint.firebaseapp.com",
  projectId: "steadafint",
  storageBucket: "steadafint.appspot.com",
  messagingSenderId: "285862301628",
  appId: "1:285862301628:web:935a0e43bb66f2a5ee25b9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app)

