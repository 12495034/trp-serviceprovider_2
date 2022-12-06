import React from 'react'
import { Container, Row, Col } from 'react-bootstrap';

import CallAppointmentIcon from '../Icons/CallAppointmentIcon';
import CheckInIcon from '../Icons/CheckInIcon';
import TestCompleteIcon from '../Icons/TestCompleteIcon';
import { UserAuth } from '../context/AuthContext';

import { firestore } from '../Firebase';
import { doc, getDoc, getDocs, collection, updateDoc } from 'firebase/firestore'

export default function AppointmentCard(props) {

    //retrieve signed in Rainbow project user
    const { user } = UserAuth();
    const userid = user.uid

  //---------------------------------------------------------------
  // Functions
  //--------------------------------------------------------------

  function handleUpdate(field, value) {
    //function to update user checkedIn status from false to tru
    const docRef = doc(firestore, `Clinics/${props.clinicid}/Appointments`, `${props.userid}`);
    const data = { [field]: value }
    updateDoc(docRef, data)
      .then(docRef => {
        console.log("Value of an Existing Document Field has been updated");
      })
      .catch(error => {
        console.log(error);
      })
  }

  function handleCall(field, value, user) {
    //function to update user called status and enter the tester that has called them
    //TODO: firebase cloud messaging needs to be integrated here at a later stage
    console.log("Calling: " + user)
    const docRef = doc(firestore, `Clinics/${props.clinicid}/Appointments`, `${props.userid}`);
    const data = { 
      [field]: value,
      calledBy: userid
     }
    updateDoc(docRef, data)
      .then(docRef => {
        console.log("Value of an Existing Document Field has been updated");
      })
      .catch(error => {
        console.log(error);
      })
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
          <div className='divider'>{props.userid}</div>
        </Col>
        <Col md={3}>
          <div className='divider'>{props.calledBy}</div>
        </Col>
        <Col md={1}>
          <div className='divider' onClick={() => { handleUpdate("wasSeen", true) }} ><TestCompleteIcon complete={props.wasSeen} checkedIn={props.checkedIn} /></div>
        </Col>
        <Col md={2}>
          <div className='divider' onClick={() => { handleUpdate("checkedIn", true) }}><CheckInIcon checkedIn={props.checkedIn} /></div>
        </Col>
        <Col md={1}>
          <div className='divider' onClick={()=>{handleCall("called",true,props.userid)}}><CallAppointmentIcon checkedIn={props.checkedIn} called={props.called}/></div>
        </Col>
      </Row>
    </Container>
  )
}
