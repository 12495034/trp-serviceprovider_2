import React from 'react'
import { Col, Row, Container } from 'react-bootstrap';

export default function ClinicCard(props) {
  return (
    <Container className='clinic-card pointer' onClick={() => props.handleClinicDetail(props.clinicId)}>
      <Row className="justify-content-md-center">
        <Col md={2}>
          <div className='card-column'>{props.date}</div>
        </Col>
        <Col md={1}>
          <div className='card-column'>{props.time}</div>
        </Col>
        <Col md={1}>
          <div className='card-column'>{props.location}</div>
        </Col>
        <Col md={4}>
          <div>{props.center}</div>
          <div>{props.addDetails}</div>
        </Col>
        <Col md={2}>
          <div className='card-column'>{props.appointments}/{props.capacity}</div>
        </Col>
        <Col md={2}>
          <div className='card-column'>{props.status}</div>
        </Col>
      </Row>
    </Container>
  )
}
