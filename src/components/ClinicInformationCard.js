import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Button, Col, Row, Container } from 'react-bootstrap';

export default function ClinicInformationCard(props) {

  const navigate = useNavigate()
 
  return (
    <Container className='clinic-information'>
    <Row>
      <Col md={2}>
        <div>{props.clinicid}</div>
      </Col>
      <Col md={2}>
        <div>{props.date}</div>
      </Col>
      <Col md={2}>
        <div>{props.location}</div>
      </Col>
      <Col md={2}>
        <div>{props.center}</div>
      </Col>
      <Col md={2}>
        <div>{props.appointments}/{props.capacity}</div>
      </Col>
      <Col md={2}>
        <div>{props.active}</div>
      </Col>
    </Row>
  </Container>
  )
}