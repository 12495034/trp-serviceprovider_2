import { addDoc, collection, } from 'firebase/firestore'
import { firestore } from '../config/Firebase';

/**
 * Function for adding a new document with a unique id to the firestore database
 * @param {String} collectionAddress Firestore collection
 * @param {Object} data Object containing data for new document
 * @returns addDoc(collection(), data)
 */

export async function firestoreAddDoc(collectionAddress, data) {
    return await addDoc(collection(firestore, collectionAddress), data)
        
}