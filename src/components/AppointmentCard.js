import React from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import CallAppointmentIcon from '../Icons/CallAppointmentIcon';
import CheckInIcon from '../Icons/CheckInIcon';
import TestCompleteIcon from '../Icons/TestCompleteIcon';
import DeleteAppointmentIcon from '../Icons/DeleteAppointmentIcon';
import { UserAuth } from '../context/AuthContext';

import { handleUpdate, handleCall } from '../ApiFunctions/firestoreUpdate';
import { doc, deleteDoc } from 'firebase/firestore';
import { firestore } from '../Firebase';


export default function AppointmentCard(props) {

  const navigate = useNavigate()

  //---------------------------------------------------------------
  // Functions
  //--------------------------------------------------------------

  {/* //TODO:possible to click on a no booking item. If there is no booking clicking on such an item should spark a different action to a proper booking */ }
  function handleClick() {
    if (props.userid) {
      navigate(`/Users/${props.userid}`);
    } 
  }

  //appointment document must not only be deleted from the clinic appointments sub-collection
  //but the time slot must be added back into the available slots map
  //the appointment must also be deleted from the users appointments sub-collection
  async function deleteAppointment(userid, clinicid, slot, time) {
    const docRefAppointClinic = doc(firestore, `Clinics/${clinicid}/Appointments`, `${userid}`);
    const docRefAppointHistory = doc(firestore, `Users/${userid}/Appointments`, `${clinicid}`);

    //run delete function at both locations in firestore database
    await deleteDoc(docRefAppointClinic);
    await deleteDoc(docRefAppointHistory);

    //modify slot map to make deleted appointment time available again
    props.slotsUpdate(props.availableSlots, slot, time)

  }

  return (
    <Container fluid="md" className='appointment-card'>
      <Row>
        <Col md={1}>
          <div onClick={handleClick} className='divider'>{props.slot}</div>
        </Col>
        <Col md={1}>
          <div className='divider'>{props.time}</div>
        </Col>
        <Col md={2}>
          <div className='divider'>{props.userid ? "Booked" : "Slot Available"}</div>
        </Col>
        <Col md={2}>
          <div className='divider'>{props.calledBy}</div>
        </Col>
        <Col md={1}>
          <div className='divider' onClick={() => { handleUpdate("wasSeen", !props.wasSeen, props.userid, props.clinicid) }} ><TestCompleteIcon complete={props.wasSeen} checkedIn={props.checkedIn} /></div>
        </Col>
        <Col md={2}>
          <div className='divider' onClick={() => { handleUpdate("checkedIn", !props.checkedIn, props.userid, props.clinicid) }}><CheckInIcon checkedIn={props.checkedIn} /></div>
        </Col>
        <Col md={1}>
          <div className='divider' onClick={() => { handleCall("called", true, props.userid, props.clinicid, props.tester) }}><CallAppointmentIcon checkedIn={props.checkedIn} called={props.called} /></div>
        </Col>
        <Col md={2}>
          <div onClick={() => { deleteAppointment(props.userid, props.clinicid, props.slot, props.time) }}><DeleteAppointmentIcon userid={props.userid} checkedIn={props.checkedIn} /> </div>
        </Col>
      </Row>
    </Container >
  )
}
