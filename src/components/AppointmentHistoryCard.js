import React from 'react'
import { Container, Row, Col } from 'react-bootstrap';

import CallAppointmentIcon from '../Icons/CallAppointmentIcon';
import CheckInIcon from '../Icons/CheckInIcon';
import TestCompleteIcon from '../Icons/TestCompleteIcon';
import { handleUpdate, handleCall } from '../ApiFunctions/firestoreUpdate';

import { useNavigate } from 'react-router-dom';

export default function AppointmentHistoryCard(props) {

  const navigate = useNavigate()
  //---------------------------------------------------------------
  // Functions
  //--------------------------------------------------------------

  function handleClick() {
    navigate(`/clinics/${props.clinicid}`);
  }

  // function handleAppointmentColorCode() {
  //   console.log(props.clinicStatus)
  //   if (props.clinicStatus == "Cancelled") {
  //     return 'appointment-card-cancelled'
  //   } else if (props.clinicStatus == "Active") {
  //     return 'appointment-card-active'
  //   } else if (props.clinicStatus == "Complete") {
  //     return 'appointment-card-complete'
  //   }
  // }

  return (
    <Container fluid="md" className='appointment-card-active' >
      <Row>
        <Col md={2}>
          <div onClick={handleClick} className='divider'>{props.date}</div>
        </Col>
        {/* <Col md={1}>
          <div className='divider'>{props.time}</div>
        </Col> */}
        {/* <Col md={1}>
          <div className='divider'>{props.slot}</div>
        </Col> */}
        <Col md={3}>
          <div className='divider'>{props.location}</div>
        </Col>
        <Col md={4}>
          <div className='divider'>{props.center}</div>
        </Col>
        {/* Only need to now the ultimate status of the users appointment here i.e. attended/un-attended <Col md={3} className='appointment-card-icons'>
          <div className='divider' onClick={() => { handleUpdate("checkedIn", !props.checkedIn, props.userid, props.clinicid) }}><CheckInIcon checkedIn={props.checkedIn} /></div>
          {props.clinicStatus !== "Active" ? null : <div className='divider'><CallAppointmentIcon checkedIn={props.checkedIn} called={props.called} /></div>}
          <div className='divider'  ><TestCompleteIcon complete={props.wasSeen} checkedIn={props.checkedIn} /></div>
        </Col> */}
        <Col md={3}>
          <div className='divider'>{props.appointmentStatus}</div>
        </Col>

        {/* //removed onclick handlers from call and was seen icons as these should be read only, with the exception of checkin
      //kept for reference incase they need to be added
      onClick={() => { handleCall("called", true, props.userid, props.clinicid, props.tester) }}
      onClick={() => { handleUpdate("wasSeen", !props.wasSeen, props.userid, props.clinicid) }} */}
      </Row>
    </Container >
  )
}
