import { createContext, useContext, useEffect, useState } from "react";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    getAuth
} from 'firebase/auth'
import { auth } from "../Firebase";
import { getDoc, doc } from "firebase/firestore";
import { firestore } from '../Firebase'

const UserContext = createContext()

export const AuthContextProvider = ({ children }) => {
    //define state and functions that we want available through the useContext hook
    const [user, setUser] = useState({})
    const [userRole, setUserRole] = useState("")
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

    //runs once to determine the user state following render
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser)
            //attempt to set details earlier for login
            if (currentUser) {
                getUserInfo(currentUser.uid)
                //retrieves the custom claims
                getAuth().currentUser.getIdTokenResult()
                    .then((idTokenResult) => {
                        // Confirm the user is an Admin.
                        if (!idTokenResult.claims.isAdmin) {
                            setUserRole("Admin")
                            console.log(idTokenResult)
                        } else {
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }


        })
        return () => {
            unsubscribe();
        }
    }, [user])

    return (
        <UserContext.Provider value={{ createUser, signIn, user, logOut, userDetails, userRole }}>
            {children}
        </UserContext.Provider>
    )
}

export const UserAuth = () => {
    return useContext(UserContext)
}