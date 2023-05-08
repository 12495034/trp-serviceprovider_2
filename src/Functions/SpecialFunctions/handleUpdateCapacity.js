import { firestoreUpdate } from "../../firestoreFunctions/firestoreUpdate"
import { maxClinicCapacity } from "../../constants/general"

/**
 * update capacity of clinic
 * @param {String} clinicId firestore clinic id
 * @param {Int} capacity current capacity of the clinic
 * @param {function} setState Pass error out of function to parent state
 */

export function handleUpdateCapacity(clinicId, capacity, setState) {
    if (capacity < maxClinicCapacity) {
        const newCapacity = parseInt(capacity) + 1
        //increment capacity field by 1
        firestoreUpdate('Clinics', clinicId, { "capacity": newCapacity })
            .then(() => {
                // clinic capacity is updated in real time in UI
            })
            .catch((error) => {
                setState(error.message)
            })
    }
}