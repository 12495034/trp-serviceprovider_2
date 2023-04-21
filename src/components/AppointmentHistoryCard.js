import React from 'react'
import { Card } from 'react-bootstrap';

export default function AppointmentHistoryCard(props) {

  return (
    <Card className="text-left appointment-card pointer" onClick={() => props.handleClinicDetail(props.clinicId)}>
      <Card.Header as='h5'>{props.date} at {props.time}</Card.Header>
      <Card.Body>
        <Card.Title as='h6'>{props.center}, {props.location}</Card.Title>
        <Card.Text as='mt-0'>{props.addDetails}</Card.Text>
      </Card.Body>
      <Card.Footer className={props.appointmentStatus==="Active"?'text-primary text-center':'text-muted text-center'}>
        {props.appointmentStatus}
      </Card.Footer>
    </Card>
  )
}
