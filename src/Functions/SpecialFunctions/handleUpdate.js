import { firestoreUpdate } from "../../FirestoreFunctions/firestoreUpdate"

//Function to update appointment data in multiple locations
export function handleUpdate(field, value, userid, clinicid, status) {
    if (status == "Active" && field != null && value != null && userid != null && clinicid != null) {
        //update clinic subcollection appointment data
        firestoreUpdate(`Clinics/${clinicid}/Appointments`, `${userid}`, { [field]: value })
        //update Users subcollection appointment data
        firestoreUpdate(`Users/${userid}/Appointments`, `${clinicid}`, { [field]: value })
    } else {
        console.log("Input Error - check function arguments")
    }
}