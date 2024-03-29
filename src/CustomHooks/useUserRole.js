import { useState, useEffect } from 'react'
import { getDoc, doc } from "firebase/firestore"
import { firestore } from "../config/Firebase"

/**
 * Custom Hook used to perform one time data retrievel of users role, loading state of the data 
 * and any system errors generated
 * @param {String} collectionName Firestore Collection
 * @param {String} docName Firestore document
 * @param {state variable} dependency Input to dependency array
 * @returns docData, isDocLoading, docError
 */

export default function useUserRole(collectionName, docName, dependency) {
    //Hook state
    const [docData, setDocData] = useState([]);
    const [isDocLoading, setIsDocLoading] = useState(true);
    const [docError, setDocError] = useState(null);

    useEffect(() => {
        if (docName !== undefined) {
            fetchDocData(collectionName, docName)
        } else {
            setDocError("Collection name or doc name has not been defined")
        }
    }, [dependency])

    async function fetchDocData(collectionName, docId) {
        //button has been setup to call the firestore database and get the user info if available
        //This aspect of the code is functioning correctly, manually added document and the data imported
        const docRef = doc(firestore, `${collectionName}`, `${docId}`)
       await getDoc(docRef)
        .then((docSnap)=>{
            if (!docSnap.exists()) {
                setDocError('Document does not exist or user data has been deleted')
                setIsDocLoading(false)
            } else {
                setDocData(docSnap.data().role)
                setIsDocLoading(false)
            }
        })
        .catch((e)=>{
            setDocError(e.message)
        })
    }

    return {
        docData,
        isDocLoading,
        docError
    }

}