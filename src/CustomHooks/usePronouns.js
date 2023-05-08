import { useState, useEffect } from 'react'
import { getDoc, doc } from "firebase/firestore"
import { firestore } from "../config/Firebase"


/**
 * Custom Hook used to perform one time data retrievel from firestore document pronouns field, loading state of the data 
 * and any system errors generated
 * @param {String} collectionName Firestore collection
 * @param {String} docName Firestore document
 * @param {state variable} dependency Input to dependency array
 * @returns docData, isDocLoading, docError
 */

export default function usePronouns(collectionName, docName, dependency) {
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
        const docRef = doc(firestore, `${collectionName}`, `${docId}`)
        await getDoc(docRef)
            .then((docSnap) => {
                if (!docSnap.exists()) {
                    setDocError('Document does not exist or user data has been deleted')
                    setIsDocLoading(false)
                } else {
                    // data().prnouns manually set as cannot use a variable here
                    setDocData(docSnap.data().pronouns)
                    setIsDocLoading(false)
                }
            })
            .catch((e) => {
                setDocError(e.message)
            })
    }

    return {
        docData,
        isDocLoading,
        docError
    }

}