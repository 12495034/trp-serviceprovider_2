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

  function handleClick(){
    navigate(`/clinics/${props.clinicid}`);
  }

  return (
    <Container fluid="md" className='appointment-card'>
      <Row>
        {/* <Col md={3}>
          <div className='divider'>{props.clinicid}</div>
        </Col> */}
        <Col md={2}>
          <div  onClick={handleClick} className='divider'>{props.date}</div>
        </Col>
        <Col md={1}>
          <div className='divider'>{props.time}</div>
        </Col>
        <Col md={1}>
          <div className='divider'>{props.slot}</div>
        </Col>
        <Col md={2}>
          <div className='divider'>{props.location}</div>
        </Col>
        <Col md={3}>
          <div className='divider'>{props.center}</div>
        </Col>
        <Col md={1}>
          <div className='divider' onClick={() => { handleUpdate("checkedIn", !props.checkedIn, props.userid, props.clinicid) }}><CheckInIcon checkedIn={props.checkedIn} /></div>
        </Col>
        <Col md={1}>
          <div className='divider' onClick={() => { handleCall("called", true, props.userid, props.clinicid, props.tester) }}><CallAppointmentIcon checkedIn={props.checkedIn} called={props.called} /></div>
        </Col>
        <Col md={1}>
          <div className='divider' onClick={() => { handleUpdate("wasSeen", !props.wasSeen, props.userid, props.clinicid) }} ><TestCompleteIcon complete={props.wasSeen} checkedIn={props.checkedIn} /></div>
        </Col>
       
      </Row>
    </Container>
  )
}
