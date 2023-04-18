import React from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap';

export default function AppointmentHistoryCard(props) {
  
  return (
    <Container  className='appointment-card-active pointer' onClick={() => props.handleClinicDetail(props.clinicId)} >
      <Row>
        <Col md={2}>
          <div className={props.appointmentStatus=="Active"?'text-primary card-column':'text-body card-column'}>{props.date}</div>
          {/* <Button variant="info" onClick={() => props.handleClinicDetail(props.clinicId)}>{props.date}</Button> */}
        </Col>
        <Col md={1}>
          <div className={props.appointmentStatus=="Active"?'text-primary card-column':'text-body card-column'}>{props.location}</div>
        </Col>
        <Col md={3}>
          <div className={props.appointmentStatus=="Active"?'text-primary card-column':'text-body card-column'}>{props.center}</div>
        </Col>
        <Col md={4}>
          <div className={props.appointmentStatus=="Active"?'text-primary card-column':'text-body card-column'}>{props.addDetails}</div>
        </Col>
        <Col md={2}>
          <div className={props.appointmentStatus=="Active"?'text-primary card-column':'text-body card-column'}>{props.appointmentStatus}</div>
        </Col>
      </Row>
    </Container >
  )
}
