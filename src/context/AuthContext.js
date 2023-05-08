import { createContext, useContext, useEffect, useState } from "react";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendEmailVerification,
    sendPasswordResetEmail,
    signOut,
    updateProfile,
    onAuthStateChanged,
    getAuth
} from 'firebase/auth'
import { auth } from "../config/Firebase";

const UserContext = createContext()

/**
 * Auth Context Provider exposes high level state variables to component tree
 */
export const AuthContextProvider = ({ children }) => {
    //High Level State Management of user variables
    const [user, setUser] = useState({})
    const [role, setRole] = useState(undefined)
    const [accountStatus, setAccountStatus] = useState(undefined)

    /**
     * Firebase function to create user with email and password
     * @param {String} email User email address
     * @param {Stirng} password User password
     * @returns Promise
     */
    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }

     /**
     * Firebase function to create user with email and password
     * @param {String} email User email address
     * @param {Stirng} password User password
     * @returns Promise
     */
    const signIn = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    /**
     * Firebase function to signout current user
     * @returns Promise
     */
    const logOut = () => {
        return signOut(auth)
    }

    /**
     * Firebase Function to reset users password based on email
     * @param {String} email Users email address
     * @returns promise
     */
    async function passwordReset(email) {
        return sendPasswordResetEmail(auth, email)
    }

    /**
     * Firebase Function to send verification email to current users email
     * @returns Promise
     */
    async function verifyEmail() {
        return sendEmailVerification(auth.currentUser)
            .then(() => {
                console.log("Verification email sent")
            });
    }
    
    /**
     * Firebase function to update user auth profile with new display name and phone number
     * Only possible for the current signed in user using firebase client sdk
     * @param {String} firstName Users first name
     * @param {String} lastName Users last name
     * @param {String} phoneNumber Users phone number
     */
    async function updateUserAuthProfile(firstName, lastName, phoneNumber) {
        updateProfile(auth.currentUser, {
            displayName: `${firstName} ${lastName}`,
            phoneNumber: `${phoneNumber}`
        }).then(() => {
            console.log("Auth Profile Updated")
        }).catch((error) => {
        });
    }

    //Firebase onAuthStateChanged function used within use effect to track user sign in state
    //Updated custom claims retrieved on each change of user state
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser)
                //retrieves the custom claims
                getAuth().currentUser.getIdTokenResult()
                    .then((idTokenResult) => {
                        setRole(idTokenResult.claims.role)
                        setAccountStatus(idTokenResult.claims.accountStatus)
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            } else {
                setUser(null)
            }
        })
        return () => {
            unsubscribe();
        }
    }, [user])

    // High level state variables and functions passwed to component tree through Provider
    return (
        <UserContext.Provider value={{ createUser, signIn, user, logOut, role, accountStatus, passwordReset, verifyEmail, updateUserAuthProfile }}>
            {children}
        </UserContext.Provider>
    )
}

export const UserAuth = () => {
    return useContext(UserContext)
}