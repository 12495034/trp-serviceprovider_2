import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Container, Row, Col, Button, Stack } from 'react-bootstrap'
import BootstrapSwitchButton from 'bootstrap-switch-button-react'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import ClinicInformationCard from '../components/ClinicInformationCard'
import NavBarTRP from '../components/NavBarTRP'
import ModalConfirmation from '../components/ModalConfirmation'
import AppointmentCard from '../components/AppointmentCard'
import Footer from '../components/Footer'
import { UserAuth } from '../context/AuthContext';
import { appointInc } from '../constants/general'
import useCollectionSnapshot from '../customHooks/UseCollectionSnapshot'
import useDocSnapshot from '../customHooks/UseDocSnapshot'
import { firestoreUpdate } from '../firestoreFunctions/firestoreUpdate'
import { convertFirestoreTimeStamp } from '../Functions/SpecialFunctions/convertFirestoreTimeStamp'
import { handleReleaseSlot } from '../Functions/SpecialFunctions/handleReleaseSlot'
import { handleAddSlot } from '../Functions/SpecialFunctions/handleAddSlot'
import { createDateString } from '../Functions/GeneralFunctions/createDateString'
import { combineSlotsAndAppointments } from '../Functions/SpecialFunctions/combineSlotsAndAppointments'
import { updateAppointmentStatus } from '../Functions/SpecialFunctions/updateAppointmentStatus'
import { handleUpdateCapacity } from '../Functions/SpecialFunctions/handleUpdateCapacity'
import SpinnerIcon from '../components/SpinnerIcon'

/**
 * Web Page showing the detail of a selected clinic
 * @returns 
 */

export default function ClinicDetail() {
    //react-router-dom params that are passed through navigate
    const { clinicId } = useParams();
    const navigate = useNavigate()
    //User object passed through AuthContext Provider
    const { user } = UserAuth();

    //Custom hookes for standard data retrievel
    const { collectionData: appointments, isCollectionLoading: isAppointmentDataLoading, collectionError: appointmentDataError }
        = useCollectionSnapshot(`Clinics/${clinicId}/Appointments`, null)
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
    //toolstip state handling
    const [toolTip, setToolTip] = useState(false)

    //initialise new array using appointments data and available appointments retrieved from firestore
    const combinedList = combineSlotsAndAppointments(appointments, clinic.slots, setError)
    //Array is sorted starting with earliest appointment slot time using a compare method in an arrow function
    const sortedAppointments = combinedList.sort((p1, p2) => (p1.slot > p2.slot) ? 1 : (p1.slot < p2.slot) ? -1 : 0)

    /**
     * Function to navigate to user profile details screen
     * @param {String} userid Firebase user id
     */
    function handleUserDetail(userid) {
        navigate(`/Users/${userid}`);
    }
    //-------------------------------------------------------------------------------------
    // Data rendering
    //-------------------------------------------------------------------------------------
    //create JSX elements based on stored state data
    const appointmentList = sortedAppointments.map((item) => {
        //for data security the name of the person is not shown at the clinic level
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
                toolTipControl={toolTip}
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
                {!isAppointmentDataLoading ?
                    <div>
                        <h1 className='page-title'>Clinic Information</h1>
                        {/* //conditional rendering so that if the clinic is not active then it is assumed to be cancelled or complete
                        //actions can therefore not be performed on the clinic data */}
                        {clinic.clinicStatus !== "Active" ?
                            null
                            :
                            <div>
                                <Stack direction='horizontal'>
                                    <OverlayTrigger
                                        show={toolTip}
                                        key='cancel'
                                        placement='bottom'
                                        overlay={
                                            <Tooltip>
                                                Pressing this button will cancel the displayed clinic
                                            </Tooltip>
                                        }
                                    >
                                        <Button variant='danger' onClick={handleShowCancel}>Cancel Clinic</Button>
                                    </OverlayTrigger>

                                    <div className='ms-auto' >Help: <BootstrapSwitchButton
                                        checked={toolTip}
                                        size="xs"
                                        onlabel='On'
                                        offlabel='Off'
                                        onChange={(checked) => {
                                            setToolTip(prev => !prev)
                                        }}
                                    /></div>
                                    <OverlayTrigger
                                        show={toolTip}
                                        key='close'
                                        placement='top'
                                        overlay={
                                            <Tooltip>
                                                Pressing this button will close the displayed clinic
                                            </Tooltip>
                                        }
                                    >
                                        <Button className='ms-auto' variant='warning' onClick={handleShowEnd}>Close Clinic</Button>
                                    </OverlayTrigger>
                                </Stack><br /></div>}
                        <Row>
                            <p>Scheduled By: {clinic.createdBy}</p>
                            <p>Scheduled on: {convertFirestoreTimeStamp(clinic.timeStamp)}</p>
                        </Row>
                        <Row>
                            <Col>
                                {clinic.clinicStatus !== "Active" ? <h5 bg='danger'>This clinic is no longer active, changes cannot be made</h5> : null}
                                <ClinicInformationCard
                                    clinicid={clinicId}
                                    date={createDateString(clinic.date)}
                                    time={clinic.startTime}
                                    location={clinic.location}
                                    center={clinic.center}
                                    addDetails={clinic.addDetails}
                                    appointments={appointments.length}
                                    capacity={clinic.capacity}
                                    active={clinic.clinicStatus} />
                            </Col>
                        </Row>
                        <hr />
                        <h4><code>{error ? error : null}</code></h4>
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
                                        show={toolTip}
                                        key='addSlot'
                                        placement='top'
                                        overlay={
                                            <Tooltip>
                                                Add an additional appointment slot (+{appointInc}mins)
                                            </Tooltip>
                                        }
                                    >
                                        <Button onClick={() => {
                                            handleAddSlot(clinicId, clinic.slots, sortedAppointments, clinic.date, clinic.capacity, appointInc, setError)
                                            handleUpdateCapacity(clinicId, clinic.capacity, setError)
                                        }}
                                        >Add Additional Slot</Button>
                                    </OverlayTrigger>}
                            </div>
                        </Row>
                    </div>
                    :
                    <Row className="justify-content-md-center p-3"><SpinnerIcon /></Row>
                }
            </Container >

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
        </div >

    )
}
