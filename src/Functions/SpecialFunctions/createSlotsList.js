import { timeZones } from "../../constants/general";

//function to create a slots array of times based on the start time and number of slots selected
export function createSlotsList(date, startTime, capacity, inc) {
    if (date != null && startTime != null && capacity != null && inc != null) {
        //date format must be "2023-12-17T03:24:00.000" for ISO-8601 compliance
        const dt = new Date(`${date}T${startTime}:00.000`);
        //create empty object to store appointment slots
        const slots = {};
        //loop from 1 to the selected capacity
        for (var i = 1; i <= capacity; i++) {
            slots[i] = dt.toLocaleTimeString(timeZones, { hour: "2-digit", minute: "2-digit" });
            dt.setMinutes(dt.getMinutes() + inc);
        }
        return slots
    } else {
        return "Input error - Check function arguments"
    }
}