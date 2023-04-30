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
export const AuthContextProvider = ({ children }) => {
    //define state and functions that we want available through the useContext hook
    const [user, setUser] = useState({})
    const [role, setRole] = useState(undefined)
    const [accountStatus, setAccountStatus] = useState(undefined)

    //create user account with email and password, user signed in automatically
    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }
    //sign in user with email and password
    const signIn = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    //sign out user
    const logOut = () => {
        return signOut(auth)
    }
    //send reset link to users email
    async function passwordReset(email) {
        return sendPasswordResetEmail(auth, email)
    }
    //send verification email to users email
    async function verifyEmail() {
        return sendEmailVerification(auth.currentUser)
            .then(() => {
                console.log("Verification email sent")
            });
    }
    //update user auth profile with new display name and phone number
    async function updateUserAuthProfile(firstName, lastName, phoneNumber) {
        updateProfile(auth.currentUser, {
            displayName: `${firstName} ${lastName}`,
            phoneNumber: `${phoneNumber}`
        }).then(() => {
            console.log("Auth Profile Updated")
        }).catch((error) => {
        });
    }

    //useEffect hook triggered by inputting user within dependancy array
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            //attempt to set details earlier for login
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

    return (
        <UserContext.Provider value={{ createUser, signIn, user, logOut, role, accountStatus, passwordReset, verifyEmail, updateUserAuthProfile }}>
            {children}
        </UserContext.Provider>
    )
}

export const UserAuth = () => {
    return useContext(UserContext)
}