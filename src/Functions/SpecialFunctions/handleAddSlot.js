import { firestoreUpdate } from "../../FirestoreFunctions/firestoreUpdate"
import { addAdditionalSlot } from "./addAdditionalSlot"

//add additional slot to clinic
export function handleAddSlot(clinicId, availableSlots, appointmentsData, date, capacity, inc) {
    if (clinicId != null && availableSlots != null && appointmentsData != null && date != null && capacity != null && inc != null) {
        const newTime = addAdditionalSlot(appointmentsData, date, inc)
        const newCapacity = parseInt(capacity) + 1
        const newSlot = { [newCapacity]: newTime }
        const newSlotsObject = Object.assign({}, availableSlots, newSlot)

        firestoreUpdate('Clinics', clinicId, { "capacity": newCapacity })
        firestoreUpdate('Clinics', clinicId, { slots: newSlotsObject })
    } else {
        console.log("Input Error - please check function arguments")
    }
}