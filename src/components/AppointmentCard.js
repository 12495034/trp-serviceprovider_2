import React, { useState } from 'react'
import { Container, Row, Col, Button, } from 'react-bootstrap';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
//Icons
import CallAppointmentIcon from '../Icons/CallAppointmentIcon';
import CheckInIcon from '../Icons/CheckInIcon';
import TestCompleteIcon from '../Icons/TestCompleteIcon';
import DeleteAppointmentIcon from '../Icons/DeleteAppointmentIcon';
//helper functions
import { handleCall } from '../Functions/SpecialFunctions/handleCall';
import { handleUpdateAppointment } from '../Functions/SpecialFunctions/handleUpdateAppointment';
import { handleDeleteAppointment } from '../Functions/SpecialFunctions/handleDeleteAppointment';

export default function AppointmentCard(props) {
  const [error, setError] = useState("")
  return (
    <Container fluid="md" className='appointment-card pointer' >
      <Row>
        <Col md={1} >
          {/* if slot is booked, clicking on slot number will navigate to the users profile */}
          {props.userid != null && props.clinicStatus === "Active" ?
            <OverlayTrigger
              show={props.toolTipControl}
              key='appointment'
              placement='top'
              overlay={
                <Tooltip>
                  View Service User profile
                </Tooltip>
              }
            >
              <Button variant={props.userid ? "info" : "null"} onClick={() => props.userid ? props.handleUserDetail(props.userid) : null}>{props.slot}</Button>

            </OverlayTrigger>
            :
            <Button variant={props.userid ? "info" : "null"} onClick={() => props.userid ? props.handleUserDetail(props.userid) : null}>{props.slot}</Button>}

        </Col>
        <Col md={1}>
          <div className='card-column'>{props.time}</div>
        </Col>
        <Col md={2}>
          <div className='card-column'>{props.userid ? "Booked" : "Slot Available"}</div>
        </Col>
        <Col md={2}>
          <div className='card-column'>{props.calledBy ? `Tester: ${props.calledBy}` : null}</div>
        </Col>
        <Col md={2}>
          <div className='card-column'><code>{error}</code></div>
        </Col>
        <Col md={3} className='appointment-card-icons'>
              <div className="icon" onClick={() => { handleUpdateAppointment("checkedIn", !props.checkedIn, props.userid, props.clinicid, props.clinicStatus, setError) }}><CheckInIcon checkedIn={props.checkedIn} /></div>
              <div className="icon" onClick={() => { handleCall("called", true, props.userid, props.clinicid, props.tester, props.clinicStatus, setError) }}><CallAppointmentIcon checkedIn={props.checkedIn} called={props.called} /></div>
              <div className="icon" onClick={() => {
                handleUpdateAppointment("wasSeen", !props.wasSeen, props.userid, props.clinicid, props.clinicStatus, setError)
              }}
              >
                <TestCompleteIcon complete={props.wasSeen} checkedIn={props.checkedIn} />
              </div>
           
          {props.checkedIn ? null : <div className='icon' onClick={() => {
            handleDeleteAppointment(props.userid, props.clinicid, props.clinicStatus, props.setError)
            props.slotsUpdate(props.clinicid, props.availableSlots, props.slot, props.time, props.clinicStatus, props.setError)
          }}><DeleteAppointmentIcon userid={props.userid} checkedIn={props.checkedIn} /> </div>}
        </Col>
      </Row>
    </Container >
  )
}
