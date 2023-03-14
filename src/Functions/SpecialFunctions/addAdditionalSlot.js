import { timeZones } from "../../Constants/Constants";

//function to get the next available time (latest + appointInc)
export function addAdditionalSlot(appointmentsData, date, inc) {
    if (appointmentsData!=null && date!=null && inc!=null) {
        const latestTime = appointmentsData[appointmentsData.length - 1].time
        //date format must be "2023-12-17T03:24:00.000" for ISO-8601 compliance
        const dt = new Date(`${date}T${latestTime}:00.000`);
        dt.setMinutes(dt.getMinutes() + inc);
        var newTime = dt.toLocaleTimeString(timeZones, { hour: "2-digit", minute: "2-digit" });
        return newTime
    } else { 
        return "Input error - Check function arguments"
    }
}