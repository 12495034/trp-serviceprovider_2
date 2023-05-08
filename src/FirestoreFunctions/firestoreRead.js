
import { collection, query, getDocs, where } from 'firebase/firestore'
import { firestore } from '../config/Firebase'

/**
 * Function to get a list of appointments with a particular status for a given clinic id
 * @param {String} field firestore field
 * @param {String} status Appointment Status eg. Active, Complete
 * @param {String} clinicId Firestore Clinic id
 * @returns Array of appointment document id's, which correspond a users firebase user id
 */
export async function getListOfAppointmentsByStatus(field, status, clinicId) {
    let listArray = []
    const q = query(collection(firestore, `Clinics/${clinicId}/Appointments`), where(`${field}`, "==", status));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        listArray.push({ id: doc.id })
    });
    return listArray
}