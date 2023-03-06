import { firestoreUpdate } from "../../FirestoreFunctions/firestoreUpdate"

//function to update user called status and enter the tester that has called them
export function handleCall(field, value, userid, clinicid, tester, status) {
    if (status == "Active" && field != null && value != null && userid != null && clinicid != null & tester != null) {
        const data = {
            [field]: value,
            calledBy: tester
        }
        firestoreUpdate(`Clinics/${clinicid}/Appointments`, `${userid}`, data)
        firestoreUpdate(`Users/${userid}/Appointments`, `${clinicid}`, data)
        return data
    } else {
        console.log("Input error - Check function arguments")
        return "Input error - Check function arguments"
    }
}