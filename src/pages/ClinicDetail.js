import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Container, Row, Col, Button, Stack } from 'react-bootstrap'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'

import ClinicInformationCard from '../components/ClinicInformationCard'
import NavBarTRP from '../components/NavBarTRP'
import ModalConfirmation from '../components/ModalConfirmation'
import AppointmentCard from '../components/AppointmentCard'
import { UserAuth } from '../context/AuthContext';
import Footer from '../components/Footer'

import BreadCrumbCustom from '../components/BreadCrumbCustom'

import { firestore } from '../Firebase'
import { doc, collection, updateDoc, query, onSnapshot, getDocs, where } from 'firebase/firestore'

//Firestore helper functions
import { firestoreUpdate } from '../ApiFunctions/firestoreUpdate'

export default function ClinicDetail() {

    //react-router-dom params that are passed through navigate
    const { clinicId } = useParams();
    //retrieve signed in Rainbow project user id
    const { userDetails } = UserAuth();


    //-------------------------------------------------------------------------------------
    // Define State
    //-------------------------------------------------------------------------------------
    const [clinic, setClinic] = useState({});
    const [appointments, setAppointments] = useState([]);
    const [error, setError] = useState("");
    const [cancelModalShow, setCancelModalShow] = useState(false);

    const handleCloseCancel = () => setCancelModalShow(false);
    const handleShowCancel = () => setCancelModalShow(true);
    const [endModalshow, setEndModalShow] = useState(false);
    const handleCloseEnd = () => setEndModalShow(false);
    const handleShowEnd = () => setEndModalShow(true);

    //console.log(attended)
    //console.log(unattended)

    //initialise new array using appointments
    const combinedList = combinedSlotsAndAppointments()
    //Array is sorted using a compare method in an arrow function
    const sortedAppointments = combinedList.sort(
        (p1, p2) => (p1.slot > p2.slot) ? 1 : (p1.slot < p2.slot) ? -1 : 0)

    //-------------------------------------------------------------------------------------
    // useEffect
    //-------------------------------------------------------------------------------------
    //use effect runs once after every render or when state is updated
    //different use effects to handle attaching an detaching of onsnapshot listeners

    //provide real time data update on the appointment cards
    useEffect(() =>
        onSnapshot(query(collection(firestore, `Clinics/${clinicId}/Appointments`)), (querySnapshot) => {
            let appointmentArray = []
            querySnapshot.forEach((doc) => {
                const id = { id: doc.id }
                const data = doc.data()
                const combine = Object.assign({}, id, data)
                appointmentArray.push(combine)
            })
            setAppointments(appointmentArray)
        })
        , [])

    //provide real time data update on the clinic information
    useEffect(() =>
        onSnapshot(doc(firestore, "Clinics", `${clinicId}`), (doc) => {
            if (doc.exists()) {
                setClinic(doc.data())
            } else {
                setError("Clinic with the chosen ID does not exist")
            }
        })
        , [])

    //-------------------------------------------------------------------------------------
    // Functions
    //-------------------------------------------------------------------------------------

    //function to update specified clinic fields
    function handleSlotsUpdate(availableSlots, newSlotNumber, time) {
        //console.log("Updating Slots data")
        const newSlot = { [newSlotNumber]: time }
        const newSlotsObject = Object.assign({}, availableSlots, newSlot)
        const docRef = doc(firestore, "Clinics", `${clinicId}`);
        firestoreUpdate(`Clinics`, `${clinicId}`, { slots: newSlotsObject })
    }

    //function to update specified clinic fields
    function handleClinicUpdate(field, value) {
        const data = { [field]: value }
        firestoreUpdate(`Clinics`, `${clinicId}`, data)
    }

    async function getClinicList() {
        //console.log("Running get Attended list function...")
        let listArray = []
        const q = query(collection(firestore, `Clinics/${clinicId}/Appointments`));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            listArray.push({ id: doc.id })
        });
        return listArray
    }

    async function getAttendedList() {
        //console.log("Running get Attended list function...")
        let attendedArray = []
        const q = query(collection(firestore, `Clinics/${clinicId}/Appointments`), where("wasSeen", "==", true));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            attendedArray.push({ id: doc.id })
        });
        return attendedArray
    }

    async function getUnAttendedList() {
        let unAttendedArray = []
        //console.log("Running get unAttended list function...")
        const q = query(collection(firestore, `Clinics/${clinicId}/Appointments`), where("wasSeen", "==", false));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            unAttendedArray.push({ id: doc.id })
        });
        return unAttendedArray
    }

    async function updateAttendedAppointments() {
        const attendedList = await getAttendedList()
        if (attendedList.length > 0) {
            for (var i = 0; i < attendedList.length; i++) {
                const data = { status: "Attended" }
                firestoreUpdate(`Clinics/${clinicId}/Appointments`, `${attendedList[i].id}`, data)
                firestoreUpdate(`Users/${attendedList[i].id}/Appointments`, `${clinicId}`, data)
            }
        }
    }

    async function updateUnAttendedAppointments() {
        const unAttendedList = await getUnAttendedList()
        if (unAttendedList.length > 0) {
            for (var i = 0; i < unAttendedList.length; i++) {
                const data = { status: "Un-Attended" }
                firestoreUpdate(`Clinics/${clinicId}/Appointments`, `${unAttendedList[i].id}`, data)
                firestoreUpdate(`Users/${unAttendedList[i].id}/Appointments`, `${clinicId}`, data)
            }
        }
    }

    async function cancelAllAppointments() {
        const completeList = await getClinicList()
        if (completeList.length > 0) {
            for (var i = 0; i < completeList.length; i++) {
                const data = { status: "Clinic Cancelled" }
                firestoreUpdate(`Clinics/${clinicId}/Appointments`, `${completeList[i].id}`, data)
                firestoreUpdate(`Users/${completeList[i].id}/Appointments`, `${clinicId}`, data)
            }
        }
    }


    //TODO: Issues here in that I can't successfully add a new field to the slots object
    function handleAddSlot() {
        const inc = 30
        console.log("Adding a new slot")
        //get the number of slots currently in use from capacity
        //this is the most appointments the clinic can have
        const currentCapacity = parseInt(clinic.capacity)
        //incrementing this capacity by 1
        var newCapacity = currentCapacity + 1

        //define the next 30 minute time slot
        //get last index of sorted array
        const latestTime = sortedAppointments[sortedAppointments.length - 1].time
        let hours = parseInt(latestTime.substring(0, 2))
        let mins = parseInt(latestTime.substring(3, 5))
        const dt = new Date(1970, 0, 1, hours, mins);
        dt.setMinutes(dt.getMinutes() + inc);
        var newTime = dt.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

        //update clinic capacity and add a new slot field to the slots map
        handleClinicUpdate("capacity", newCapacity)
        handleSlotsUpdate(clinic.slots, newCapacity, newTime)
    }

    //function to combined the available slots and booked appointments into a single list for screen display purposes
    function combinedSlotsAndAppointments() {
        //take a copy of the appointments list
        const combinedList = appointments.slice()
        //loop throough object fields and add as a new object to the combinedList array
        for (const key in clinic.slots) {
            if (clinic.slots.hasOwnProperty(key)) {
                //parse string to int to enable correct sorting
                const newSlot = { slot: parseInt(key), time: clinic.slots[key] }
                combinedList.push(newSlot)
            }
        }
        return combinedList
    }

    //-------------------------------------------------------------------------------------
    // Data rendering
    //-------------------------------------------------------------------------------------

    //create JSX elements based on stored state data
    const appointmentList = sortedAppointments.map((item) => {
        //for data security the name of the person is not shown but the id of the person is perhaps
        return (
            <AppointmentCard
                key={item.slot}
                clinicid={clinicId}
                slot={item.slot}
                time={item.time}
                userid={item.id}
                checkedIn={item.id ? item.checkedIn : ""}
                called={item.called}
                calledBy={item.calledBy}
                wasSeen={item.wasSeen}
                tester={`${userDetails.FirstName} ${userDetails.LastName}`}
                slotsUpdate={handleSlotsUpdate}
                availableSlots={clinic.slots}
                clinicStatus={clinic.clinicStatus}
            />
        )
    })


    //-------------------------------------------------------------------------------------
    // Page Content
    //-------------------------------------------------------------------------------------
    return (
        <div className='page-body'>
            <NavBarTRP />
            <BreadCrumbCustom />
            <Container className='page-content'>
                {/* //conditional rendering so that if the clinic is not active then it is assumed to be cancelled or complete
                //actions can therefore not be performed on the clinic data */}
                {clinic.clinicStatus !== "Active" ? null : <div><Stack direction='horizontal' gap={3}>
                    {/* <h1 className="Title">Clinic Information</h1> */}
                    {/* <h4 className='ms-auto'>Queue Size</h4><Badge text='light' bg="info">4</Badge> */}
                    <Button variant='danger' onClick={handleShowCancel}>Cancel Clinic</Button>
                    <Button className='ms-auto' variant='warning' onClick={handleShowEnd}>Close Clinic</Button>
                </Stack><br/></div>}

                <Row className="justify-content-md-center">
                    <Col>
                        {clinic.clinicStatus !== "Active" ? <h5 bg='danger'>This clinic is no longer active, changes cannot be made</h5> : null}
                        <ClinicInformationCard clinicid={clinicId} date={clinic.date} time={clinic.startTime} location={clinic.location} center={clinic.center} appointments={appointments.length} capacity={clinic.capacity} active={clinic.clinicStatus} />
                    </Col>
                </Row>
                <hr />
                <Row>
                    <Col>
                        {/* <AppointmentTable /> */}
                        {appointmentList}
                    </Col>
                </Row>
                <Row>
                    <div className='d-grid'>
                        {clinic.clinicStatus !== "Active" ?
                            <Button disabled onClick={handleAddSlot}>Add Additional Slot</Button>
                            :
                            <OverlayTrigger
                                key='bottom'
                                placement='bottom'
                                overlay={
                                    <Tooltip>
                                        test
                                    </Tooltip>
                                }
                            >
                                <Button onClick={handleAddSlot}>Add Additional Slot</Button>
                            </OverlayTrigger>}
                    </div>
                </Row>
            </Container>
            <Footer />

            <ModalConfirmation
                show={cancelModalShow}
                close={handleCloseCancel}
                header="Are you sure you want to Cancel the Clinic?"
                body="This will cancel all appointments scheduled for this clinic"
                updatefunction={() => {
                    handleClinicUpdate("clinicStatus", "Cancelled")
                    cancelAllAppointments()
                    handleCloseCancel()
                }}
            />

            <ModalConfirmation
                show={endModalshow}
                close={handleCloseEnd}
                header="Are you sure you want to End the Clinic?"
                body="Ending the clinic will update clinic statistics and update applicable appointments to un-attended. This action cannot be undone"
                updatefunction={() => {
                    handleClinicUpdate("clinicStatus", "Complete")
                    updateAttendedAppointments()
                    updateUnAttendedAppointments()
                    handleCloseEnd()
                }}
            />
        </div>

    )
}
