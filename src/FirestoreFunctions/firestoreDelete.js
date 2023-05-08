import { doc, deleteDoc } from 'firebase/firestore';
import { firestore } from '../Firebase';

/**
 * 
 * @param {String} collectionName Firestore collection name
 * @param {String} docName Firestore document name
 * @returns deleteDoc(docRef)
 */
export async function firestoreDelete(collectionName, docName) {
    const docRef = doc(firestore, collectionName, docName);
    return await deleteDoc(docRef);
}