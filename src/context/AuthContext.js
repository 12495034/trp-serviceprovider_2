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
import { auth} from "../Firebase";

const UserContext = createContext()

export const AuthContextProvider = ({ children }) => {
    //define state and functions that we want available through the useContext hook
    const [user, setUser] = useState({})
    const [role, setRole] = useState(undefined)
    const [accountStatus, setAccountStatus] = useState(undefined)

    console.log("Role:",role,"Status:",accountStatus)
    
    const createUser = (email, password) => {
        console.log("Auth context create user function")
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const signIn = (email, password) => {
        console.log("Auth context signIn function")
        return signInWithEmailAndPassword(auth, email, password)
    }

    const logOut = () => {
        console.log("Auth context signOut function")
        return signOut(auth)
    }

    async function passwordReset(email) {
        console.log("Resetting password")
        return sendPasswordResetEmail(auth, email)
    }

    async function verifyEmail() {
        return sendEmailVerification(auth.currentUser)
            .then(() => {
                console.log("Verification email sent")
            });
    }

    async function updateUserAuthProfile(firstName, lastName, phoneNumber) {
        updateProfile(auth.currentUser, {
            displayName: `${firstName} ${lastName}`,
            phoneNumber: `${phoneNumber}`
        }).then(() => {
            console.log("Auth Profile Updated")
        }).catch((error) => {
        });
    }

    //runs once to determine the user state following render
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