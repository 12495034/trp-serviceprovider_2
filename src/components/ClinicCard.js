import React from 'react'
import { Card, Badge, Stack } from 'react-bootstrap';

export default function ClinicCard(props) {
  return (
    <Card className="text-left clinic-card pointer" onClick={() => props.handleClinicDetail(props.clinicId)}>
      <Card.Header as='h5'>{props.date}</Card.Header>
      <Card.Body>
        <Card.Title as='h6'>{props.center}, {props.location}</Card.Title>
        <Card.Text as='mt-1'>Details: {props.addDetails}</Card.Text>
        <Stack direction='horizontal' gap={3}>
          <Card.Text as='mt-0'>Start Time: {props.time}</Card.Text>
          <Card.Text>Capacity: {props.capacity}</Card.Text>
        </Stack>
      </Card.Body>
      <Card.Footer className="text-muted">
        <Stack direction='horizontal' gap={3}>
          {props.capacity - props.appointments > 0 ?
            <h5 className='ms-auto'>Appointments Booked - <Badge pill bg='success'> {props.appointments}</Badge></h5>
            :
            <h5 className='ms-auto'>Appointments Booked - <Badge pill bg='danger'> {props.appointments}</Badge></h5>}
        </Stack>
      </Card.Footer>
    </Card>

  )
}

// <Card.Text>Spaces Available -  <Badge pill bg='success'>{props.capacity - props.appointments}</Badge></Card.Text>
//         {props.capacity - props.appointments > 0 ?
//           <Card.Text>Spaces Available -  <Badge pill bg='success'>{props.capacity - props.appointments}</Badge></Card.Text>
//           :
//           <Card.Text>Spaces Available -  <Badge pill bg='danger'>None</Badge></Card.Text>
//         }
