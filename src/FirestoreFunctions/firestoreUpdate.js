import { doc, updateDoc } from 'firebase/firestore'
import { firestore } from '../config/Firebase';

/**
 * re-usable function for updating document fields in firestore
 * @param {String} collectionAddress Firestore Collection name
 * @param {String} documentId Firestore document Id
 * @param {Object} data Object of data for updating firestore document
 * @returns updateDoc(doc(), data)
 */
export function firestoreUpdate(collectionAddress, documentId, data) {
    return updateDoc(doc(firestore, collectionAddress, documentId), data)
}



