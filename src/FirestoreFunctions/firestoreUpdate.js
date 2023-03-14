import { doc, updateDoc } from 'firebase/firestore'
import { firestore } from '../Firebase';

//re-usable function for updating document fields in firestore
//takes collection and document references along with an input data object
export function firestoreUpdate(collectionAddress, documentId, data) {
    return updateDoc(doc(firestore, collectionAddress, documentId), data)
}



