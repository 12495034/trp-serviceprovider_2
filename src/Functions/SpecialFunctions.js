//function to create a slots array of times based on the start time and number of slots selected
//can this function be seperated into another file for readability?
//return the slots map, which is then used to set the state at a higher level
export function createSlotsList(date, startTime, capacity, inc) {
    //error here with code that is causing clinic start times and slot times to be created incorrectly
    const dt = new Date(`${date}T${startTime}:00Z`);
    //create empty object to store appointment slots
    const slots = {};
    //loop from 1 to the selected capacity
    for (var i = 1; i <= capacity; i++) {
      slots[i] = dt.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
      dt.setMinutes(dt.getMinutes() + inc);
    }
    return slots
  }


    //function to combined the available slots map and booked appointments objects array into a single list for clinic detail screen
    export function combineSlotsAndAppointments(appointmentsArray, clinicSlotsMap) {
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
  }

  