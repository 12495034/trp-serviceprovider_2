import { doc, updateDoc } from 'firebase/firestore'
import { firestore } from '../Firebase';

//re-usable function for updating document fields in firestore
//takes collection and document references along with an input data object
export function firestoreUpdate(collectionAddress, documentId, data) {
    const docRef = doc(firestore, collectionAddress, documentId);
    updateDoc(docRef, data)
        .then(docRef => {
            console.log("200: Value of an Existing Document Field has been updated");
            return "Existing document field updated"
        })
        .catch(error => {
            console.log("400:", error.message);
            return error.message
        })
}



