import { firestoreUpdate } from "../../firestoreFunctions/firestoreUpdate"

/**
 * function to release booked appointment slot so other users can book
 * @param {String} clinicId firestore clinic ic
 * @param {Object} availableSlots Object of currently available appointments
 * @param {String} newSlotNumber The slot id of the released appointment
 * @param {String} time The time of the released appointment slot
 * @param {String} clinicStatus Status of the clinic eg. Active, Cancelled, Complete
 * @param {function} setState Pass error out of function to parent state
 */

export function handleReleaseSlot(clinicId, availableSlots, newSlotNumber, time, clinicStatus, setState) {
    if (clinicStatus === "Active") {
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