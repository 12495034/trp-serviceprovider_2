

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