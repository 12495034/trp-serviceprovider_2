import { createContext, useContext, useEffect, useState } from "react";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from 'firebase/auth'
import { auth } from "../Firebase";
import { collection, getDocs, getDoc, setDoc, addDoc, doc } from "firebase/firestore";
import { firestore } from '../Firebase'

const UserContext = createContext()

export const AuthContextProvider = ({ children }) => {
    //define state and functions that we want available through the useContext hook
    const [user, setUser] = useState({})

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

    //runs once to determine the user state following render
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            //console.log(currentUser)
            setUser(currentUser)
        })
        return () => {
            unsubscribe();
        }
    }, [])

    return (
        <UserContext.Provider value={{ createUser, signIn, user, logOut}}>
            {children}
        </UserContext.Provider>
    )
}

export const UserAuth = () => {
    return useContext(UserContext)
}