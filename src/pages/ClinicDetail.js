import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Container, Row, Col, Button, Stack, Badge, Modal } from 'react-bootstrap'

import ClinicInformationCard from '../components/ClinicInformationCard'
import NavBarTRP from '../components/NavBarTRP'
import ConfirmationBox from '../components/ConfirmationBox';
import AppointmentCard from '../components/AppointmentCard'
import ProgressSpinner from '../components/ProgressSpinner'

import { firestore } from '../Firebase'
import { doc, getDoc, getDocs, collection, updateDoc } from 'firebase/firestore'

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
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [loading, setLoading] = useState(false)

    console.log(clinic);
    console.log(appointments)


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
    async function fetchClinicInfo() {
        const docRef = doc(firestore, "Clinics", `${clinicId}`);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            //console.log("Document data:", docSnap.data());
            setClinic(docSnap.data())
        } else {
            // doc.data() will be undefined in this case
            setError("Clinic with the chosen ID does not exist")
        }
    }

    //function to fetch clinic appointments sub-collection data
    async function fetchClinicAppointmentInfo() {
        const docRef = collection(firestore, `Clinics/${clinicId}/Appointments`);
        //console.log(docRef)
        const docSnap = await getDocs(docRef);
        docSnap.forEach((doc) => {
            // console.log(doc.data()); // "doc1", "doc2" and "doc3"
            setAppointments((prev) => {
                const id = { id: doc.id }
                const data = doc.data()
                const combine = Object.assign({}, id, data)
                //need to combine string and array prior to setting state
                return [...prev, combine]
            })
        });
    }

    // async function fetchUserInfo() {
    //     const docRef = collection(firestore, `Clinics/${clinicId}/Appointments`);
    //     //console.log(docRef)
    //     const docSnap = await getDocs(docRef);
    //     docSnap.forEach((doc) => {
    //         // console.log(doc.data()); // "doc1", "doc2" and "doc3"
    //         setAppointments((prev) => {
    //             const id = { id: doc.id }
    //             const data = doc.data()
    //             const combine = Object.assign({}, id, data)
    //             //need to combine string and array prior to setting state
    //             return [...prev, combine]
    //         })
    //     });
    // }

    //function to update specified clinic fields
    function handleClinicUpdate(field, value) {
        console.log("Updating Clinic data")
        setLoading(prev => !prev)
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
        handleClose()

        //set time delay
        var delayInMilliseconds = 1000; //1 second

        setTimeout(function () {
            setLoading(prev => !prev)
        }, delayInMilliseconds);

    }

    //TODO: Issues here in that I can't successfully add a new field to the slots object
    const handleAddSlot = () => {
        //get the number of slots currently in use from capacity
        const currentCapacity = parseInt(clinic.capacity)
        var newCapacity = currentCapacity + 1
        //define new object to be added
        const newSlot = { [newCapacity]: "21:00" }
        //get the time of the last appointment
        //set state so that screen updates
        //TODO: How do I only ammend the object not overwrite then the entire slots object

        handleClinicUpdate("capacity", newCapacity)
    }

    //function to combined the available slots and booked appointments into a single list for screen display purposes
    function combinedSlotsAndAppointments() {
        //take a copy of the appointments list
        const combinedList = appointments.slice()
        //loop throough object fields and add as a new object to the combinedList array
        for (const key in clinic.slots) {
            if (clinic.slots.hasOwnProperty(key)) {
                const newSlot = { slot: key, time: clinic.slots[key] }
                combinedList.push(newSlot)
            }
        }
        return combinedList
    }

    //-------------------------------------------------------------------------------------
    // Data rendering
    //-------------------------------------------------------------------------------------

    //initialise new array using appointments
    const combinedList = combinedSlotsAndAppointments()
    //console.log(combinedList)
    //Array is sorted using a compare method in an arrow function
    const sortedAppointments = combinedList.sort(
        (p1, p2) => (p1.slot > p2.slot) ? 1 : (p1.slot < p2.slot) ? -1 : 0)
    //create JSX elements based on stored state data
    const appointmentList = sortedAppointments.map((item) => {
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
                    <h4 className='ms-auto'>Queue Size</h4><Badge text='light' bg="info">4</Badge>
                    <Button onClick={handleShow}>Cancel</Button>
                    <Button variant='warning'>End</Button>
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

            {/* TODO: Modal is working but want it as a seperate component that can be re-used for different confirmation messages */}
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
            </>

        </div>

    )
}
