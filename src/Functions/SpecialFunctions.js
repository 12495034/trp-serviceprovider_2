import { firestoreUpdate } from '../FirestoreFunctions/firestoreUpdate';
import { getListOfAppointmentsByStatus } from '../FirestoreFunctions/firestoreRead';

//function to create a slots array of times based on the start time and number of slots selected
//return the slots map, which is then used to set the state at a higher level
export function createSlotsList(date, startTime, capacity, inc) {
  console.log("variables:", date, startTime, capacity, inc)
  //error here with code that is causing clinic start times and slot times to be created incorrectly
  const dt = new Date(`${date}T${startTime}:00Z`);
  console.log(dt)
  //create empty object to store appointment slots
  const slots = {};
  //loop from 1 to the selected capacity
  for (var i = 1; i <= capacity; i++) {
    slots[i] = dt.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    dt.setMinutes(dt.getMinutes() + inc);
  }
  console.log("slots map:", slots)
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

//update appointment status when a clinic is cancelled or closed
export async function updateAppointmentStatus(field, value, clinicId, updateStatus) {
  const List = await getListOfAppointmentsByStatus(field, value, clinicId)
  const clinicUpdate = ""
  const userUpdate = ""
  if (List.length > 0) {
    for (var i = 0; i < List.length; i++) {
      const data = { status: updateStatus }
      clinicUpdate = firestoreUpdate(`Clinics/${clinicId}/Appointments`, `${List[i].id}`, data)
      userUpdate = firestoreUpdate(`Users/${List[i].id}/Appointments`, `${clinicId}`, data)
    }
    return clinicUpdate
  }
}

export function handleAddSlot(clinicId, availableSlots, appointmentsData, date, capacity, inc) {
  //console.log(availableSlots, appointmentsData, date, capacity, inc)
  const newTime = addAdditionalSlot(appointmentsData, date, inc)
  const newCapacity = parseInt(capacity) + 1
  const newSlot = { [newCapacity]: newTime }
  const newSlotsObject = Object.assign({}, availableSlots, newSlot)
  const capacityUpdate = firestoreUpdate('Clinics', clinicId, { "capacity": newCapacity })
  const slotsUpdate = firestoreUpdate('Clinics', clinicId, { slots: newSlotsObject })
}

//function to add a new slot to the list of available slots
export function addAdditionalSlot(appointmentsData, date, inc) {
  const latestTime = appointmentsData[appointmentsData.length - 1].time
  const dt = new Date(`${date}T${latestTime}:00Z`);
  dt.setMinutes(dt.getMinutes() + inc);
  var newTime = dt.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  return newTime
}

//function to update specified clinic fields
export function handleReleaseSlot(clinicId, availableSlots, newSlotNumber, time) {
  const newSlotsObject = Object.assign({}, availableSlots, { [newSlotNumber]: time })
  firestoreUpdate(`Clinics`, `${clinicId}`, { slots: newSlotsObject })
}

//Function to update appointment data in multiple locations
export function handleUpdate(field, value, userid, clinicid, status) {
  if (status == "Active") {
    //update clinic subcollection appointment data
    firestoreUpdate(`Clinics/${clinicid}/Appointments`, `${userid}`, { [field]: value })
    //update Users subcollection appointment data
    firestoreUpdate(`Users/${userid}/Appointments`, `${clinicid}`, { [field]: value })
  } else {
    console.log("Clinic is not active, changes cannot be made")
  }
}

//function to update user called status and enter the tester that has called them
export function handleCall(field, value, userid, clinicid, tester, status) {
  if (status == "Active") {
    const data = {
      [field]: value,
      calledBy: tester
    }
    firestoreUpdate(`Clinics/${clinicid}/Appointments`, `${userid}`, data)
    firestoreUpdate(`Users/${userid}/Appointments`, `${clinicid}`, data)
  } else {
    console.log("Clinic is not active, therefore changes cannot be made")
  }
}

