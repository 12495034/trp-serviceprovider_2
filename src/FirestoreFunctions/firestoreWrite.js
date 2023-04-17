import { addDoc, collection, } from 'firebase/firestore'
import { firestore } from '../config/Firebase';

//re-usable function for updating document fields in firestore
//takes collection and document references along with an input data object
export async function firestoreAddDoc(collectionAddress, data) {
    return await addDoc(collection(firestore, collectionAddress), data)
        
}