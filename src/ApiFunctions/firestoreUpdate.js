import { doc, updateDoc } from 'firebase/firestore'
import { firestore } from '../Firebase';

//Update firestore data in multiple locations
export function handleUpdate(field, value, userid, clinicid) {
    //update clinic data
    handleClinicAppointmentUpdate(field, value, userid, clinicid)
    //update denormalised user appointment history
    handleAppointmentHistoryUpdate(field, value, userid, clinicid)
}

//update clinic appointment information in real time
export function handleClinicAppointmentUpdate(field, value, userid, clinicid) {
    //function to update user checkedIn status from false to true
    const docRef = doc(firestore, `Clinics/${clinicid}/Appointments`, `${userid}`);
    const data = { [field]: value }
    updateDoc(docRef, data)
        .then(docRef => {
            console.log("Value of an Existing Document Field has been updated");
        })
        .catch(error => {
            console.log(error);
        })

}

//update denormalised user appointment history information in real time
export function handleAppointmentHistoryUpdate(field, value, userid, clinicid) {
    console.log("Updating user appointment history data")
    //object data based on generic field and value input
    const data = { [field]: value }
    const docRef = doc(firestore, `Users/${userid}/Appointments`, `${clinicid}`);
    updateDoc(docRef, data)
        .then(docRef => {
            console.log("Value of an Existing Document Field has been updated");
        })
        .catch(error => {
            console.log(error);
        })
}

export function handleCall(field, value, userid, clinicid, tester) {
    //function to update user called status and enter the tester that has called them
    //TODO: firebase cloud messaging needs to be integrated here at a later stage
    const docRef = doc(firestore, `Clinics/${clinicid}/Appointments`, `${userid}`);
    const data = {
      [field]: value,
      calledBy: tester
    }
    updateDoc(docRef, data)
      .then(docRef => {
        console.log("Value of an Existing Document Field has been updated");
      })
      .catch(error => {
        console.log(error);
      })
  }



