import { firestoreUpdate } from "../../FirestoreFunctions/firestoreUpdate"
import { getListOfAppointmentsByStatus } from "../../FirestoreFunctions/firestoreRead"

//update appointment status when a clinic is cancelled or closed
export async function updateAppointmentStatus(field, value, clinicId, updateStatus) {
    const List = await getListOfAppointmentsByStatus(field, value, clinicId)
    if (List.length > 0) {
        for (var i = 0; i < List.length; i++) {
            const data = { status: updateStatus }
            firestoreUpdate(`Clinics/${clinicId}/Appointments`, `${List[i].id}`, data)
            firestoreUpdate(`Users/${List[i].id}/Appointments`, `${clinicId}`, data)
        }
        return clinicUpdate
    }
}