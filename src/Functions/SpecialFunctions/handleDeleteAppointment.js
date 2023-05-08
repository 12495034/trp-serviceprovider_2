import { firestore } from "../../config/Firebase";
import { runTransaction, doc } from "firebase/firestore"

/**
 * function to update user called status and enter the tester that has called them
 * @param {String} userId firebase user id
 * @param {String} clinicId firestore clinic id
 * @param {String} clinicStatus status of the clinic eg. Active, Cancelled, Complete
 * @param {function} setState Pass error out of function to parent state
 */
export async function handleDeleteAppointment(userId, clinicId, clinicStatus, setState) {

    const clinicsAppointmentsRef = doc(firestore, `Clinics/${clinicId}/Appointments`, `${userId}`)
    const usersAppointmentsRef = doc(firestore, `Users/${userId}/Appointments`, `${clinicId}`)

    if (clinicStatus === "Active") {
        try {
            await runTransaction(firestore, async (transaction) => {
                transaction.delete(clinicsAppointmentsRef);
                transaction.delete(usersAppointmentsRef);
            });
        } catch (e) {
        }
    }
}