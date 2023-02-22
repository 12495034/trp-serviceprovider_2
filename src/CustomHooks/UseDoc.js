import { useState, useEffect } from 'react'
import { collection, getDoc, doc } from "firebase/firestore"
import { firestore } from "../Firebase"

export default function useDoc(collectionName, docName, dependency) {
    //Hook state
    const [docData, setDocData] = useState({});
    const [isDocLoading, setIsDocLoading] = useState(true);
    const [docError, setDocError] = useState('');

    useEffect(() => {
        if (docName != undefined) {
            fetchDocData(collectionName, docName)
        } else {
            setDocError("Collection name not defined")
        }
    }, [dependency])

    async function fetchDocData(collectionName, docId) {
        //button has been setup to call the firestore database and get the user info if available
        //This aspect of the code is functioning correctly, manually added document and the data imported
        try {
            const docRef = doc(firestore, `${collectionName}`, `${docId}`)
            const docSnap = await getDoc(docRef);
            setDocData(docSnap.data())
        } catch (e) {
            setDocError(e.message)
        }
    }

    return {
        docData,
        isDocLoading,
        docError
    }

}