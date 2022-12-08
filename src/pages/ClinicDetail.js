import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Container, Row, Col, Button, Stack, Badge, Modal } from 'react-bootstrap'

import ClinicInformationCard from '../components/ClinicInformationCard'
import NavBarTRP from '../components/NavBarTRP'
import ModalConfirmation from '../components/ModalConfirmation'
import AppointmentCard from '../components/AppointmentCard'
import ProgressSpinner from '../components/ProgressSpinner'

import { firestore } from '../Firebase'
import { doc, getDoc, getDocs, collection, updateDoc, query, where, onSnapshot } from 'firebase/firestore'

export default function ClinicDetail() {

    //react-router-dom params that are passed through navigate
    const { clinicId } = useParams();
    //console.log(clinicId)


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
    const [loading, setLoading] = useState(false)
    const [userData, setUserData] = useState({})

    console.log(clinic);
    console.log(appointments)

    //initialise new array using appointments
    const combinedList = combinedSlotsAndAppointments()
    //Array is sorted using a compare method in an arrow function
    const sortedAppointments = combinedList.sort(
        (p1, p2) => (p1.slot > p2.slot) ? 1 : (p1.slot < p2.slot) ? -1 : 0)
    console.log(sortedAppointments)

    //-------------------------------------------------------------------------------------
    // useEffect
    //-------------------------------------------------------------------------------------
    //use effect runs once after every render or when state is updated
    useEffect(() => {
        fetchClinicInfo()
        fetchClinicAppointmentInfo()
    }, [])

    //-------------------------------------------------------------------------------------
    // Functions
    //-------------------------------------------------------------------------------------

    //function to fetch high level clinic information
    function fetchClinicInfo() {
        const docRef = doc(firestore, "Clinics", `${clinicId}`);
        const unsubscribe = onSnapshot(docRef, (doc) => {
            if (doc.exists()) {
                //console.log("Document data:", docSnap.data());
                setClinic(doc.data())
            } else {
                // doc.data() will be undefined in this case
                setError("Clinic with the chosen ID does not exist")
            }
        })
        return () => unsubscribe();
    }

    function fetchClinicAppointmentInfo() {
        const docRef = collection(firestore, `Clinics/${clinicId}/Appointments`);
        const q = query(docRef);
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            let appointmentArray = []
            querySnapshot.forEach((doc) => {
                const id = { id: doc.id }
                const data = doc.data()
                const combine = Object.assign({}, id, data)
                appointmentArray.push(combine)
            })
            setAppointments(appointmentArray)
        })
        return () => unsubscribe();
        //
    }

    function getUserInfo(id) {
        const docRef = doc(firestore, "Users", `${id}`);
        const unsubscribe = onSnapshot(docRef, (doc) => {
            if (doc.exists()) {
                //console.log("Document data:", docSnap.data());
                setUserData(doc.data())
            } else {
                // doc.data() will be undefined in this case
                setError("Clinic with the chosen ID does not exist")
            }
        })
        return () => unsubscribe();
    }

    //function to update specified clinic fields
    function handleClinicUpdate(field, value) {
        console.log("Updating Clinic data")
        //object data based on generic field and value input
        const data = { [field]: value }
        const docRef = doc(firestore, "Clinics", `${clinicId}`);
        updateDoc(docRef, data)
            .then(docRef => {
                console.log("Value of an Existing Document Field has been updated");
            })
            .catch(error => {
                console.log(error);
            })
        //close modal if open
        handleCloseCancel()
        handleCloseEnd()
    }

    //function to update specified clinic fields
    function handleSlotsUpdate(newSlotNumber, time) {
        console.log("Updating Slots data")
        const newSlot = { [newSlotNumber]: time }
        const newSlotsObject = Object.assign({}, clinic.slots, newSlot)
        const docRef = doc(firestore, "Clinics", `${clinicId}`);
        updateDoc(docRef, {
            slots: newSlotsObject
        })
            .then(docRef => {
                console.log("Value of an Existing Document Field has been updated");
            })
            .catch(error => {
                console.log(error);
            })
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
        handleSlotsUpdate(newCapacity, newTime)
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
                userid={item.id ? item.id : "unbooked"}
                checkedIn={item.id ? item.checkedIn : ""}
                called={item.called}
                calledBy={item.calledBy}
                wasSeen={item.wasSeen}
            />
        )
    })


    //-------------------------------------------------------------------------------------
    // Page Content
    //-------------------------------------------------------------------------------------
    return (
        <div className='page-body'>
            <NavBarTRP />
            <Container className='page-content'>
                {/* //conditional rendering so that if the clinic is not active then it is assumed to be cancelled or complete
                //actions can therefore not be performed on the clinic data */}
                {clinic.clinicStatus != "Active" ? null : <Stack direction='horizontal' gap={3}>
                    <h1 className="Title">Clinic Information</h1>
                    {/* <h4 className='ms-auto'>Queue Size</h4><Badge text='light' bg="info">4</Badge> */}
                    <Button className='ms-auto' onClick={handleShowCancel}>Cancel</Button>
                    <Button variant='warning' onClick={handleShowEnd}>End</Button>
                    {loading ? <ProgressSpinner /> : null}
                </Stack>}

                <Row>
                    <Col>
                        {/* data here needs to be pulled from firebase */}
                        <ClinicInformationCard clinicid={clinicId} date={clinic.date} location={clinic.location} center={clinic.center} appointments={appointments.length} capacity={clinic.capacity} active={clinic.clinicStatus} />
                    </Col>
                </Row>
                <Row className='clinic-detail-table-title'>
                    <Col md={1}>
                        Slot id
                    </Col>
                    <Col md={1}>
                        Time
                    </Col>
                    <Col md={3}>
                        Name
                    </Col>
                    <Col md={3}>
                        Called By
                    </Col>
                    <Col md={1}>
                        Tested
                    </Col>
                    <Col md={2}>
                        User Status
                    </Col>
                    <Col md={1}>
                        Action
                    </Col>
                </Row>
                <hr />
                <Row>
                    <Col>
                        {/* <AppointmentTable /> */}
                        {appointmentList.length > 0 ? appointmentList : <h3>No Appointments currently booked</h3>}
                    </Col>
                </Row>
                <Row>
                    <div className='d-grid'>
                        {/* //TODO: change this condition as will want to base it on just an empty object. JSON. stringify wont be used to print to screen */}
                        {/* {availslots === '{}' ? <Button onClick={handleAddSlot}>Add Additional Slot</Button> : <Button disabled >All slots must be allocated before adding more</Button>} */}
                        <Button onClick={handleAddSlot}>Add Additional Slot</Button>
                    </div>
                </Row>
            </Container>

            //Modal component called and shown when relevant button is pressed
            <ModalConfirmation
                show={cancelModalShow}
                close={handleCloseCancel}
                header="Are you sure you want to Cancel the Clinic?"
                body="There are ...active appointments still to be seen"
                updatefunction={() => handleClinicUpdate("clinicStatus", "Cancelled")}
            />
            <ModalConfirmation
                show={endModalshow}
                close={handleCloseEnd}
                header="Are you sure you want to End the Clinic?"
                body="Ending the clinic will update clinic statistics and cancel any active appointments still to be seen. This action cannot be undone"
                updatefunction={() => handleClinicUpdate("clinicStatus", "Complete")}
            />
            {/* TODO: Modal is working but want it as a seperate component that can be re-used for different confirmation messages
            <>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Are you sure you want to cancel the clinic?</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>There are {appointments.length} live appointments that are yet to be seen</Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={() => handleClinicUpdate("clinicStatus", "Cancelled")}>
                            Confirm
                        </Button>
                        <Button variant="secondary" onClick={handleClose}>
                            Cancel
                        </Button>
                    </Modal.Footer>
                </Modal>
            </> */}

        </div>

    )
}
