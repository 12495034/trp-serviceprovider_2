import React from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import CallAppointmentIcon from '../Icons/CallAppointmentIcon';
import CheckInIcon from '../Icons/CheckInIcon';
import TestCompleteIcon from '../Icons/TestCompleteIcon';
import { UserAuth } from '../context/AuthContext';

import { handleUpdate, handleCall } from '../ApiFunctions/firestoreUpdate';

export default function AppointmentCard(props) {

  //retrieve signed in Rainbow project user
  //passed to handleCall function to populate field that indicates which tester has called the user forward
  const { user } = UserAuth();
  const userid = user.uid

  const navigate = useNavigate()

  //---------------------------------------------------------------
  // Functions
  //--------------------------------------------------------------

  {/* //TODO:possible to click on a no booking item. If there is no booking clicking on such an item should spark a different action to a proper booking */ }
  function handleClick() {
    if (props.userid != "unbooked") {
      navigate(`/Users/${props.userid}`);
    } else {
      console.log("Add appointment")
    }
  }

  return (
    <Container fluid="md" className='appointment-card'>
      <Row>
        <Col md={1}>
          <div className='divider'>{props.slot}</div>
        </Col>
        <Col md={1}>
          <div className='divider'>{props.time}</div>
        </Col>
        <Col md={3}>
          <div onClick={handleClick} className='divider'>{props.userid}</div>
        </Col>
        <Col md={3}>
          <div className='divider'>{props.calledBy}</div>
        </Col>
        <Col md={1}>
          <div className='divider' onClick={() => { handleUpdate("wasSeen", !props.wasSeen, props.userid, props.clinicid) }} ><TestCompleteIcon complete={props.wasSeen} checkedIn={props.checkedIn} /></div>
        </Col>
        <Col md={2}>
          <div className='divider' onClick={() => { handleUpdate("checkedIn", !props.checkedIn, props.userid, props.clinicid) }}><CheckInIcon checkedIn={props.checkedIn} /></div>
        </Col>
        <Col md={1}>
          <div className='divider' onClick={() => { handleCall("called", true, props.userid, props.clinicid, userid) }}><CallAppointmentIcon checkedIn={props.checkedIn} called={props.called} /></div>
        </Col>
      </Row>
    </Container>
  )
}
