import { firestoreUpdate } from "../../firestoreFunctions/firestoreUpdate"
import { addAdditionalSlot } from "./addAdditionalSlot"
import { maxClinicCapacity } from "../../constants/general"

//add additional slot to clinic map
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