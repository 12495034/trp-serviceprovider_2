
import { collection, query, getDocs, where } from 'firebase/firestore'
import { firestore } from '../config/Firebase'

//get a list of appointments with a particular status for a given clinic id
export async function getListOfAppointmentsByStatus(field, status, clinicId) {
    let listArray = []
    const q = query(collection(firestore, `Clinics/${clinicId}/Appointments`), where(`${field}`, "==", status));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        listArray.push({ id: doc.id })
    });
    return listArray
}