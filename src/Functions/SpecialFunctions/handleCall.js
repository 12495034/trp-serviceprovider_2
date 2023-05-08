import { firestore } from "../../config/Firebase";
import { runTransaction, doc, } from "firebase/firestore"

/**
 * function to update user called status in firestore and enter the tester that has called them
 * @param {String} field field name in firestore
 * @param {String} value value added to firestore field
 * @param {String} userId firebase user id
 * @param {String} clinicId firestore clinic id
 * @param {String} tester name of admin user logged in when appointment is called
 * @param {String} clinicStatus status of the clinic eg. Active, Cancelled, Complete
 * @param {function} setState Pass error out of function to parent state
 */

export async function handleCall(field, value, userId, clinicId, tester, clinicStatus, setState) {

    const clinicsAppointmentsRef = doc(firestore, `Clinics/${clinicId}/Appointments`, `${userId}`)
    const usersAppointmentsRef = doc(firestore, `Users/${userId}/Appointments`, `${clinicId}`)
    const data = {
        [field]: value,
        calledBy: tester
    }
    if (clinicStatus === "Active") {
        try {
            await runTransaction(firestore, async (transaction) => {
                transaction.update(clinicsAppointmentsRef, data);
                transaction.update(usersAppointmentsRef, data);
            });
            setState("")
        } catch (e) {
            setState(e.message)
        }
    }
}
