import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Button, Col, Row, Container } from 'react-bootstrap';

export default function ClinicCard(props) {

  const navigate = useNavigate()

  function handleClick() {
    navigate(`${props.clinicId}`);
  }

  return (
    <Container className='clinic-card' onClick={handleClick}>
      <Row className="justify-content-md-center">
        <Col md={2}>
          <div>{props.clinicId}</div>
        </Col>
        <Col md={1}>
          <div>{props.date}</div>
        </Col>
        <Col md={2}>
          <div>{props.location}</div>
        </Col>
        <Col md={2}>
          <div>{props.center}</div>
        </Col>
        <Col md={1}>
          <div>{props.appointments}/{props.capacity}</div>
        </Col>
        <Col md={2}>
          <div>{props.status}</div>
        </Col>
        <Col md={2}>
          <div>{props.active}</div>
        </Col>
      </Row>
    </Container>
  )
}
