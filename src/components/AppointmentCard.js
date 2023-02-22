import React from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import CallAppointmentIcon from '../Icons/CallAppointmentIcon';
import CheckInIcon from '../Icons/CheckInIcon';
import TestCompleteIcon from '../Icons/TestCompleteIcon';
import DeleteAppointmentIcon from '../Icons/DeleteAppointmentIcon';
import { deleteAppointment } from '../FirestoreFunctions/firestoreDelete';
import { handleUpdate, handleCall } from '../FirestoreFunctions/firestoreUpdate';

export default function AppointmentCard(props) {
  return (
    <Container fluid="md" className='appointment-card' >
      <Row>
        <Col md={1} >
          {/* if slot is booked, clicking on slot number will navigate to the users profile */}
          <div onClick={() => props.userid ? props.handleUserDetail(props.userid) : null} className='divider'>{props.slot}</div>
        </Col>
        <Col md={1}>
          <div className='divider'>{props.time}</div>
        </Col>
        <Col md={2}>
          <div className='divider'>{props.userid ? "Booked" : "Slot Available"}</div>
        </Col>
        <Col md={4}>
          <div className='divider'>{props.calledBy ? `Tester: ${props.calledBy}` : null}</div>
        </Col>
        <Col md={4} className='appointment-card-icons'>
          <div className='icon' onClick={() => { handleUpdate("checkedIn", !props.checkedIn, props.userid, props.clinicid, props.clinicStatus) }}><CheckInIcon checkedIn={props.checkedIn} /></div>
          <div className='icon' onClick={() => { handleCall("called", true, props.userid, props.clinicid, props.tester, props.clinicStatus) }}><CallAppointmentIcon checkedIn={props.checkedIn} called={props.called} /></div>
          <div className='icon' onClick={() => {
            handleUpdate("wasSeen", !props.wasSeen, props.userid, props.clinicid, props.clinicStatus)
          }}
          >
            <TestCompleteIcon complete={props.wasSeen} checkedIn={props.checkedIn} />
          </div>
          {props.checkedIn ? null : <div className='icon' onClick={() => {
            deleteAppointment(props.userid, props.clinicid, props.slot, props.time, props.clinicStatus)
            props.slotsUpdate(props.availableSlots, props.slot, props.time)
          }}><DeleteAppointmentIcon userid={props.userid} checkedIn={props.checkedIn} /> </div>}
        </Col>
      </Row>
    </Container >
  )
}
