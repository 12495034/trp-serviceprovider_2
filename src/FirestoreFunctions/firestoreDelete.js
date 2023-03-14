import { doc, deleteDoc } from 'firebase/firestore';
import { firestore } from '../Firebase';

//firestore function to delete a single document from the database
export async function firestoreDelete(collectionName, docName) {
    const docRef = doc(firestore, collectionName, docName);
    return await deleteDoc(docRef);
}