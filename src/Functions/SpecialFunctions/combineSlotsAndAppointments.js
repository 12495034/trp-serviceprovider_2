//function to combined the available slots map and booked appointments objects array into a single list for clinic detail screen
export function combineSlotsAndAppointments(appointmentsArray, clinicSlotsMap) {
    if (appointmentsArray != null && clinicSlotsMap != null) {
        //take a copy of the appointments list
        const combinedList = appointmentsArray.slice()
        //loop throough object fields and add as a new object to the combinedList array
        for (const key in clinicSlotsMap) {
            if (clinicSlotsMap.hasOwnProperty(key)) {
                //parse string to int to enable correct sorting
                const newSlot = { slot: parseInt(key), time: clinicSlotsMap[key] }
                //add reformated data to combinedListArray
                combinedList.push(newSlot)
            }
        }
        return combinedList
    } else {
        return null
    }
}