import { firestoreUpdate } from "../../firestoreFunctions/firestoreUpdate"
import { addAdditionalSlot } from "./addAdditionalSlot"
import { maxClinicCapacity } from "../../constants/general"

/**
 * Function to add additional available appointment to firestore clinic slot map
 * @param {String} clinicId Firestore clinic id
 * @param {Object} availableSlots Object containing currently available appointment slots
 * @param {Array} appointmentsData Array of all appointment slots regardless of status
 * @param {String} date date of the clinic
 * @param {Int} capacity clinic capacity
 * @param {Int} timeInc duration of new appointment slot
 * @param {function} setState Pass error out of function to parent state
 */

export function handleAddSlot(clinicId, availableSlots, appointmentsData, date, capacity, timeInc, setState) {

    if (capacity < maxClinicCapacity) {
        const newTime = addAdditionalSlot(appointmentsData, date, timeInc)
        const newCapacity = parseInt(capacity) + 1
        const newSlot = { [newCapacity]: newTime }
        const newSlotsObject = Object.assign({}, availableSlots, newSlot)

        //update slots map with additional slot and return result
        firestoreUpdate('Clinics', clinicId, { slots: newSlotsObject })
            .then(() => {
                
            })
            .catch((error) => {
                setState(error.message)
            })
    } else { 
        setState("The maximum number of slots that can be added is 20")
    }

}