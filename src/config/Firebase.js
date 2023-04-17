//refactor code to put this in a seperate file
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth } from '@firebase/auth';


//replace details below with new fconfig details if project is changed
const firebaseConfig = {
    apiKey: "AIzaSyBGo-teVGXTeEwRZDsbBvF4EZL1Flc-2TM",
    authDomain: "trp-developement.firebaseapp.com",
    projectId: "trp-developement",
    storageBucket: "trp-developement.appspot.com",
    messagingSenderId: "1033564104537",
    appId: "1:1033564104537:web:8013665387a6931dc40e48",
    measurementId: "G-E83N214HP9"
};
//TODO:tutorial indicated to hide this in a .env file. How is this accomplished?

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;
//initialize firebase services
export const firestore = getFirestore(app);
export const auth = getAuth(app);





