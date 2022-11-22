//refactor code to put this in a seperate file
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBGo-teVGXTeEwRZDsbBvF4EZL1Flc-2TM",
    authDomain: "trp-developement.firebaseapp.com",
    projectId: "trp-developement",
    storageBucket: "trp-developement.appspot.com",
    messagingSenderId: "1033564104537",
    appId: "1:1033564104537:web:8013665387a6931dc40e48",
    measurementId: "G-E83N214HP9"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);