import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth } from '@firebase/auth';


/**
 * Firebase Project configuration details to connect to firebase back end
 * taken from firebase console.
 */
const firebaseConfig = {
    apiKey: "AIzaSyBGo-teVGXTeEwRZDsbBvF4EZL1Flc-2TM",
    authDomain: "trp-developement.firebaseapp.com",
    projectId: "trp-developement",
    storageBucket: "trp-developement.appspot.com",
    messagingSenderId: "1033564104537",
    appId: "1:1033564104537:web:8013665387a6931dc40e48",
    measurementId: "G-E83N214HP9"
};

/**
 * Firebase App initialisation
 */
const app = initializeApp(firebaseConfig);
export default app;

/**
 * Firestore initialisation
 */
export const firestore = getFirestore(app);

/**
 * Authentication initialisation
 */
export const auth = getAuth(app);





