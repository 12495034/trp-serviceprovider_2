
/**
 * function to combined the available slots map and booked appointments objects array into a single list for clinic detail screen
 * @param {Array} appointmentsArray Array of current appointment bookings
 * @param {Object} clinicSlotsMap Object of available appointment slots
 * @param {function} callback callback function to return error message
 * @returns Array of booked appointments and available appointment slots
 */

export function combineSlotsAndAppointments(appointmentsArray, clinicSlotsMap, callback) {
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
    //Check if an array of data has been compiled, if not return empty array and set error message
    if(combinedList){
        return combinedList
    } else { 
        callback("Error combining available slots and booked appointment data")
        return []
    }
    

}