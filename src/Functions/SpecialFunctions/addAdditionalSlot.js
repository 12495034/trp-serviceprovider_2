//function to get the next available time (latest + appointInc)
export function addAdditionalSlot(appointmentsData, date, inc) {
    if (appointmentsData) {
        const latestTime = appointmentsData[appointmentsData.length - 1].time
        const dt = new Date(`${date}T${latestTime}:00Z`);
        dt.setMinutes(dt.getMinutes() + inc);
        var newTime = dt.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
        return newTime
    } else { 
        return "No appointments Data provided";
    }
}