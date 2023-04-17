import { firestoreUpdate } from "../../firestoreFunctions/firestoreUpdate"
import { maxClinicCapacity } from "../../constants/general"

//update capacity of clinic
export function handleUpdateCapacity(clinicId, capacity, setState) {
    if (capacity < maxClinicCapacity) {
        const newCapacity = parseInt(capacity) + 1
        //increment capacity field by 1
        firestoreUpdate('Clinics', clinicId, { "capacity": newCapacity })
            .then(() => {

            })
            .catch((error) => {
                setState(error.message)
            })
    }
}