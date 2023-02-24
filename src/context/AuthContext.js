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
import { auth, firestore } from "../Firebase";
import { getDoc, doc } from "firebase/firestore";

const UserContext = createContext()

export const AuthContextProvider = ({ children }) => {
    //define state and functions that we want available through the useContext hook
    const [user, setUser] = useState({})
    const [isAdmin, setIsAdmin] = useState(undefined)
    const [userDetails, setUserDetails] = useState({});

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

    async function getUserInfo(id) {
        if (id) {
            const docRef = doc(firestore, "Users", `${id}`);
            const docSnap = await getDoc(docRef);
            const data = docSnap.exists() ? docSnap.data() : null
            if (data === null || data === undefined) return null
            setUserDetails({ id, ...data })
        }
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
                        // Confirm the user is an Admin.
                        if (!idTokenResult.claims.isAdmin) {
                            setIsAdmin(true)
                            console.log(idTokenResult)
                        } else {
                            setIsAdmin(false)
                        }
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
        <UserContext.Provider value={{ createUser, signIn, user, logOut, userDetails, isAdmin, passwordReset, verifyEmail, updateUserAuthProfile }}>
            {children}
        </UserContext.Provider>
    )
}

export const UserAuth = () => {
    return useContext(UserContext)
}