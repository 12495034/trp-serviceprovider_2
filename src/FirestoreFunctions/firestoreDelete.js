import { doc, deleteDoc } from 'firebase/firestore';
import { firestore } from '../Firebase';
//appointment document must not only be deleted from the clinic appointments sub-collection
//but the time slot must be added back into the available slots map
//the appointment must also be deleted from the users appointments sub-collection
export async function deleteAppointment(userid, clinicid, slot, time, status) {
    const docRefAppointClinic = doc(firestore, `Clinics/${clinicid}/Appointments`, `${userid}`);
    const docRefAppointHistory = doc(firestore, `Users/${userid}/Appointments`, `${clinicid}`);
    if (status == "Active") {
        //run delete function at both locations in firestore database
        await deleteDoc(docRefAppointClinic);
        await deleteDoc(docRefAppointHistory);
    } else {
        console.log("Clinic is not active, therefore changes cannot be made")
    }
}