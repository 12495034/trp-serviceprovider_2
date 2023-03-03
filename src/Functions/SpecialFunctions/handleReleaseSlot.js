import { firestoreUpdate } from "../../FirestoreFunctions/firestoreUpdate"

//function to update specified clinic fields
export function handleReleaseSlot(clinicId, availableSlots, newSlotNumber, time) {
    const newSlotsObject = Object.assign({}, availableSlots, { [newSlotNumber]: time })
    return firestoreUpdate(`Clinics`, `${clinicId}`, { slots: newSlotsObject })
  }