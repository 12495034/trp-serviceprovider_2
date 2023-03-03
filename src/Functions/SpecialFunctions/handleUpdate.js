import { firestoreUpdate } from "../../FirestoreFunctions/firestoreUpdate"

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