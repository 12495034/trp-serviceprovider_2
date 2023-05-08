import { useState, useEffect } from 'react'
import { doc, onSnapshot } from "firebase/firestore"
import { firestore } from "../config/Firebase"

/**
 * Custom Hook used to perform real time data retrievel from firestore document, loading state of the data 
 * and any system errors generated
 * @param {String} collectionName Firestore Collection
 * @param {String} docName Firestore Document
 * @param {state variable} dependency Input to dependency array
 * @returns docData, isDocLoading, docError
 */

export default function useDocSnapshot(collectionName, docName, dependency) {
    //Hook state
    const [docData, setDocData] = useState([]);
    const [isDocLoading, setIsDocLoading] = useState(true);
    const [docError, setDocError] = useState('');

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

        onSnapshot(doc(firestore, `${collectionName}`, `${docId}`), (doc) => {
            if (doc.exists()) {
                setDocData(doc.data())
            } else {
                setDocError("Clinic with the chosen ID does not exist")
            }
        })
    }

    return {
        docData,
        isDocLoading,
        docError
    }

}

