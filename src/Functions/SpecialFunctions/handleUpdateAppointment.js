
import { firestore } from "../../config/Firebase";
import { runTransaction, doc, } from "firebase/firestore"

//Function to update appointment data in multiple locations
//Using transaction as operation is atomic (fails unless all operations complete)
export async function handleUpdateAppointment(field, value, userId, clinicId, clinicStatus, setState) {

  const clinicsAppointmentsRef = doc(firestore, `Clinics/${clinicId}/Appointments`, `${userId}`)
  const usersAppointmentsRef = doc(firestore, `Users/${userId}/Appointments`, `${clinicId}`)
  if (clinicStatus == "Active") {
    try {
      await runTransaction(firestore, async (transaction) => {
        transaction.update(clinicsAppointmentsRef, { [field]: value });
        transaction.update(usersAppointmentsRef, { [field]: value });
      });
      setState("")
    } catch (e) {
      setState(e.message)
    }
  }

}