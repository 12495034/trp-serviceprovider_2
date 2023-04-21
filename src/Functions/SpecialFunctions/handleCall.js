import { firestore } from "../../config/Firebase";
import { runTransaction, doc, } from "firebase/firestore"

//function to update user called status and enter the tester that has called them
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
