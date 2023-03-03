import { timeZones } from "../../Constants/Constants";

//function to create a slots array of times based on the start time and number of slots selected
export function createSlotsList(date, startTime, capacity, inc) {
    if (date != null && startTime != null && capacity != null && inc != null) {
        const dt = new Date(`${date}T${startTime}:00`);
        //create empty object to store appointment slots
        const slots = {};
        //loop from 1 to the selected capacity
        for (var i = 1; i <= capacity; i++) {
            slots[i] = dt.toLocaleTimeString(timeZones, { hour: "2-digit", minute: "2-digit" });
            dt.setMinutes(dt.getMinutes() + inc);
        }
        return slots
    } else {
        return null
    }
}