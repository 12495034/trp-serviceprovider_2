import { useState, useEffect } from 'react'
import { collection, query, doc, onSnapshot } from "firebase/firestore"
import { firestore } from "../Firebase"

export default function useDocSnapshot(collectionName, docName, dependency) {
    //Hook state
    const [docData, setDocData] = useState([]);
    const [isDocLoading, setIsDocLoading] = useState(true);
    const [docError, setDocError] = useState('');

    useEffect(() => {
        if (docName != undefined) {
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

