import { firestoreUpdate } from "../../firestoreFunctions/firestoreUpdate"

//function to update specified clinic fields
export function handleReleaseSlot(clinicId, availableSlots, newSlotNumber, time, clinicStatus, setState) {
    if (clinicStatus == "Active") {
        const newSlotsObject = Object.assign({}, availableSlots, { [newSlotNumber]: time })
         firestoreUpdate(`Clinics`, `${clinicId}`, { slots: newSlotsObject })
         .then(()=>{
         })
         .catch((error)=>{
         })
    } else {
        console.log("Input Error - check function arguments")
    }
}