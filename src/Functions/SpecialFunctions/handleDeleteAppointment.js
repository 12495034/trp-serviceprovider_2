import { firestore } from "../../config/Firebase";
import { runTransaction, doc } from "firebase/firestore"

//function to update user called status and enter the tester that has called them
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