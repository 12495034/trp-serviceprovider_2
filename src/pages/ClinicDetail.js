import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Container, Row, Col, Button, Stack } from 'react-bootstrap'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import ClinicInformationCard from '../components/ClinicInformationCard'
import NavBarTRP from '../components/NavBarTRP'
import ModalConfirmation from '../components/ModalConfirmation'
import AppointmentCard from '../components/AppointmentCard'
import Footer from '../components/Footer'
import { UserAuth } from '../context/AuthContext';
import { appointInc } from '../Constants/Constants'
import useCollectionSnapshot from '../CustomHooks/UseCollectionSnapshot'
import useDocSnapshot from '../CustomHooks/UseDocSnapshot'
import { firestoreUpdate } from '../FirestoreFunctions/firestoreUpdate'
import { updateAppointmentStatus, handleAddSlot, handleReleaseSlot, combineSlotsAndAppointments, convertFirestoreTimeStamp } from '../Functions/SpecialFunctions'
import { createDateString } from '../Functions/GeneralFunctions'



export default function ClinicDetail() {
    //react-router-dom params that are passed through navigate
    const { clinicId } = useParams();
    const navigate = useNavigate()
    const { user } = UserAuth();
    //Custom hookes for standard data retrievel
    const { collectionData: appointments, isCollectionLoading: isAppointmentDataLoading, collectionError: appointmentDataError } = useCollectionSnapshot(`Clinics/${clinicId}/Appointments`, null)
    const { docData: clinic, isDocLoading, docError } = useDocSnapshot("Clinics", clinicId, null)
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

    //navigate to user profile details
    function handleUserDetail(userid) {
        navigate(`/Users/${userid}`);
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
                slotsUpdate={handleReleaseSlot}
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
                    <div><Stack direction='horizontal'>
                        <Button variant='danger' onClick={handleShowCancel}>Cancel Clinic</Button>
                        <Button className='ms-auto' variant='warning' onClick={handleShowEnd}>Close Clinic</Button>
                    </Stack><br /></div>}
                <Row>
                    <Stack direction="horizontal" gap={3}>
                        <div><p>Scheduled By: {clinic.createdBy}</p></div>
                        <div className="ms-auto"><p>Scheduled on: {convertFirestoreTimeStamp(clinic.timeStamp)}</p></div>
                    </Stack>
                </Row>
                <Row>
                    <Col>
                        {clinic.clinicStatus !== "Active" ? <h5 bg='danger'>This clinic is no longer active, changes cannot be made</h5> : null}
                        <ClinicInformationCard clinicid={clinicId} date={createDateString(clinic.date)} time={clinic.startTime} location={clinic.location} center={clinic.center} appointments={appointments.length} capacity={clinic.capacity} active={clinic.clinicStatus} />
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
                            <Button disabled>Add Additional Slot</Button>
                            :
                            <OverlayTrigger
                                key='bottom'
                                placement='bottom'
                                overlay={
                                    <Tooltip>
                                        Add an additional appointment slot (+{appointInc}mins)
                                    </Tooltip>
                                }
                            >
                                <Button onClick={() => handleAddSlot(clinicId, clinic.slots, sortedAppointments, clinic.date, clinic.capacity, appointInc)}>Add Additional Slot</Button>
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
                    firestoreUpdate('Clinics', clinicId, { "clinicStatus": "Cancelled" })
                    updateAppointmentStatus("wasSeen", false, clinicId, "Clinic Cancelled")
                    handleCloseCancel()
                }}
            />

            <ModalConfirmation
                show={endModalshow}
                close={handleCloseEnd}
                header="Are you sure you want to End the Clinic?"
                body="Ending the clinic will update clinic statistics and update applicable appointments to un-attended. This action cannot be undone"
                updatefunction={() => {
                    firestoreUpdate('Clinics', clinicId, { "clinicStatus": "Complete" })
                    updateAppointmentStatus("wasSeen", true, clinicId, "Attended")
                    updateAppointmentStatus("wasSeen", false, clinicId, "Un-Attended")
                    handleCloseEnd()
                }}
            />
        </div>

    )
}
