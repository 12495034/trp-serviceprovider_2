import React, { useState } from 'react'
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
import { useNavigate } from 'react-router-dom';
import { appointInc } from '../Constants/Constants'
import { firestore } from '../Firebase'
import { doc, collection, query, getDocs, where } from 'firebase/firestore'
import useCollectionSnapshot from '../CustomHooks/UseCollectionSnapshot'
import { firestoreUpdate } from '../FirestoreFunctions/firestoreUpdate'
import useDocSnapshot from '../CustomHooks/UseDocSnapshot'
import { combineSlotsAndAppointments } from '../Functions/SpecialFunctions'
import { getListOfAppointmentsByStatus } from '../FirestoreFunctions/firestoreRead'

export default function ClinicDetail() {
    //react-router-dom params that are passed through navigate
    const { clinicId } = useParams();
    const navigate = useNavigate()
    const { user } = UserAuth();
    //Custom hookes for standard data retrievel
    const { collectionData: appointments, isCollectionLoading: isAppointmentDataLoading, collectionError: appointmentDataError } = useCollectionSnapshot('Clinics/${clinicId}/Appointments', null)
    const { docData:clinic, isDocLoading, docError } = useDocSnapshot("Clinics", clinicId, null)
    
    //-------------------------------------------------------------------------------------
    // Define State
    //-------------------------------------------------------------------------------------
    const [error, setError] = useState("");
    const [cancelModalShow, setCancelModalShow] = useState(false);
    //modal state handling
    const handleCloseCancel = () => setCancelModalShow(false);
    const handleShowCancel = () => setCancelModalShow(true);
    const [endModalshow, setEndModalShow] = useState(false);
    const handleCloseEnd = () => setEndModalShow(false);
    const handleShowEnd = () => setEndModalShow(true);

    //initialise new array using appointments
    const combinedList = combineSlotsAndAppointments(appointments, clinic.slots)
    //Array is sorted starting with earliest appointment slot time using a compare method in an arrow function
    const sortedAppointments = combinedList.sort((p1, p2) => (p1.slot > p2.slot) ? 1 : (p1.slot < p2.slot) ? -1 : 0)

    function handleUserDetail(userid) {
        navigate(`/Users/${userid}`);
    }

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

    async function updateAttendedAppointments() {
        const attendedList = await getListOfAppointmentsByStatus("wasSeen",true,clinicId)
        if (attendedList.length > 0) {
            for (var i = 0; i < attendedList.length; i++) {
                const data = { status: "Attended" }
                firestoreUpdate(`Clinics/${clinicId}/Appointments`, `${attendedList[i].id}`, data)
                firestoreUpdate(`Users/${attendedList[i].id}/Appointments`, `${clinicId}`, data)
            }
        }
    }

    async function updateUnAttendedAppointments() {
        const unAttendedList = await getListOfAppointmentsByStatus("wasSeen",false,clinicId)
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

    function handleAddSlot(inc) {
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
                tester={`${user.displayName}`}
                slotsUpdate={handleSlotsUpdate}
                availableSlots={clinic.slots}
                clinicStatus={clinic.clinicStatus}
                handleUserDetail={handleUserDetail}
            />
        )
    })

    //-------------------------------------------------------------------------------------
    // Page Content
    //-------------------------------------------------------------------------------------
    return (
        <div className='page-body'>
            <NavBarTRP />
            {/* <BreadCrumbCustom /> */}
            <Container className='page-content'>

                {/* //conditional rendering so that if the clinic is not active then it is assumed to be cancelled or complete
                //actions can therefore not be performed on the clinic data */}
                {clinic.clinicStatus !== "Active" ?
                    null
                    :
                    <div><Stack direction='horizontal' gap={3}>
                        <Button variant='danger' onClick={handleShowCancel}>Cancel Clinic</Button>
                        <Button className='ms-auto' variant='warning' onClick={handleShowEnd}>Close Clinic</Button>
                    </Stack><br /></div>}
                <Row>
                    <Col>
                        <p>Scheduled By: {clinic.createdBy} on ...date...</p>
                    </Col>
                    <Col>

                    </Col>
                </Row>
                <Row>
                    <Col>
                        {clinic.clinicStatus !== "Active" ? <h5 bg='danger'>This clinic is no longer active, changes cannot be made</h5> : null}
                        <ClinicInformationCard clinicid={clinicId} date={clinic.date} time={clinic.startTime} location={clinic.location} center={clinic.center} appointments={appointments.length} capacity={clinic.capacity} active={clinic.clinicStatus} />
                    </Col>
                </Row>
                <hr />
                <Row>
                    <Col>
                        {appointmentList}
                    </Col>
                </Row>
                <Row>
                    <div className='d-grid'>
                        {clinic.clinicStatus !== "Active" ?
                            <Button disabled onClick={() => handleAddSlot(appointInc)}>Add Additional Slot</Button>
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
                                <Button onClick={() => handleAddSlot(appointInc)}>Add Additional Slot</Button>
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
