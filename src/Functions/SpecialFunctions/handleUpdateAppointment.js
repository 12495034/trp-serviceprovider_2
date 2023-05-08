
import { firestore } from "../../config/Firebase";
import { runTransaction, doc, } from "firebase/firestore"

/**
 * Function to update appointment record in multiple locations
 * @param {String} field firestore field name
 * @param {String} value Value to be stored in firestore field
 * @param {String} userId firebase user id
 * @param {String} clinicId firestore clinic id
 * @param {String} clinicStatus Status of clinic eg. Active, Cancelled, Complete
 * @param {*} setState Pass error out of function to parent state
 */

export async function handleUpdateAppointment(field, value, userId, clinicId, clinicStatus, setState) {

  const clinicsAppointmentsRef = doc(firestore, `Clinics/${clinicId}/Appointments`, `${userId}`)
  const usersAppointmentsRef = doc(firestore, `Users/${userId}/Appointments`, `${clinicId}`)

  if (clinicStatus === "Active") {
    try {
      await runTransaction(firestore, async (transaction) => {
        transaction.update(clinicsAppointmentsRef, { [field]: value });
        transaction.update(usersAppointmentsRef, { [field]: value });
      });
      setState("")
    } catch (e) {
      //setState function passed from calling component so that error can be passed back to UI
      setState(e.message)
    }
  }
}