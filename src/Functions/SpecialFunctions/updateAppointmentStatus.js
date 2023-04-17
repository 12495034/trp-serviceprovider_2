import { getListOfAppointmentsByStatus } from "../../firestoreFunctions/firestoreRead"
import { firestore } from "../../config/Firebase";
import { runTransaction, doc } from "firebase/firestore"

//update the status of all appointment documents when a clinic is cancelled or closed
//In security rules for transactions or batched writes, there is a limit of 20 document access calls for the 
//entire atomic operation in addition to the normal 10 call limit for each single document operation in the batch.
export async function updateAppointmentStatus(field, value, clinicId, updateStatus,setState) {
    try {
        await runTransaction(firestore, async (transaction) => {
            const List = await getListOfAppointmentsByStatus(field, value, clinicId)
            if (List.length > 0) {
                for (var i = 0; i < List.length; i++) {
                    const data = { status: updateStatus }
                    transaction.update(doc(firestore, `Clinics/${clinicId}/Appointments`, `${List[i].id}`), data);
                    transaction.update(doc(firestore, `Users/${List[i].id}/Appointments`, `${clinicId}`), data);
                }
            }
        });
        setState("")
    } catch (e) {
        setState(e.message)
    }

}