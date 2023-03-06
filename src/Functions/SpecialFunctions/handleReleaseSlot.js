import { firestoreUpdate } from "../../FirestoreFunctions/firestoreUpdate"

//function to update specified clinic fields
export function handleReleaseSlot(clinicId, availableSlots, newSlotNumber, time) {
    if (clinicId != null && availableSlots != null && newSlotNumber != null && newSlotNumber > 0 && time != null) {
        const newSlotsObject = Object.assign({}, availableSlots, { [newSlotNumber]: time })
        return firestoreUpdate(`Clinics`, `${clinicId}`, { slots: newSlotsObject })
    } else {
        console.log("Input Error - check function arguments")
    }
}