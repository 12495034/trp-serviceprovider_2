import { doc, updateDoc } from 'firebase/firestore'
import { firestore } from '../Firebase';

//Update firestore data in multiple locations
export function handleUpdate(field, value, userid, clinicid, status) {
    if (status == "Active") {
        //update clinic data
        handleClinicAppointmentUpdate(field, value, userid, clinicid)
        //update denormalised user appointment history
        handleAppointmentHistoryUpdate(field, value, userid, clinicid)
    } else {
        console.log("Clinic is not active, changes cannot be made")
    }
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
    console.log(data)
    const docRef = doc(firestore, `Users/${userid}/Appointments`, `${clinicid}`);
    updateDoc(docRef, data)
        .then(docRef => {
            console.log("Value of an Existing Document Field has been updated");
        })
        .catch(error => {
            console.log(error);
        })
}

export function handleCall(field, value, userid, clinicid, tester, status) {
    //function to update user called status and enter the tester that has called them
    //TODO: firebase cloud messaging needs to be integrated here at a later stage
    const clinicDocRef = doc(firestore, `Clinics/${clinicid}/Appointments`, `${userid}`);
    const userDocRef = doc(firestore, `Users/${userid}/Appointments`, `${clinicid}`);

    if (status == "Active") {

        const data = {
            [field]: value,
            calledBy: tester
        }

        updateDoc(clinicDocRef, data)
            .then(docRef => {
                console.log("Value of an Existing Document Field has been updated");
            })
            .catch(error => {
                console.log(error);
            })

        updateDoc(userDocRef, data)
            .then(docRef => {
                console.log("Value of an Existing Document Field has been updated");
            })
            .catch(error => {
                console.log(error);
            })
    } else {
        console.log("Clinic is not active, therefore changes cannot be made")
    }
}


//re-usable function for updating document fields in firestore
//takes collection and document references along with an input data object
export function firestoreUpdate(collectionAddress, documentId, data) {
    const docRef = doc(firestore, collectionAddress, documentId);
    updateDoc(docRef, data)
        .then(docRef => {
            console.log("Value of an Existing Document Field has been updated");
        })
        .catch(error => {
            console.log(error);
        })
}



