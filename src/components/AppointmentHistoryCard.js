import React from 'react'
import { Container, Row, Col } from 'react-bootstrap';

export default function AppointmentHistoryCard(props) {
  return (
    <Container fluid="md" className='appointment-card-active' >
      <Row>
        <Col md={2}>
          <div onClick={()=>props.handleClinicDetail(props.clinicId)} className='divider'>{props.date}</div>
        </Col>
        <Col md={3}>
          <div className='divider'>{props.location}</div>
        </Col>
        <Col md={4}>
          <div className='divider'>{props.center}</div>
        </Col>
        <Col md={3}>
          <div className='divider'>{props.appointmentStatus}</div>
        </Col>
      </Row>
    </Container >
  )
}
