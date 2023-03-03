import { firestoreUpdate } from "../../FirestoreFunctions/firestoreUpdate"

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