import React from 'react'
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';
import Accordion from 'react-bootstrap/Accordion';
import { Button } from 'react-bootstrap';


export default function ClinicCard(props) {
  
  //object must be converted to an array to map to the appointment list
  const appointmentsListArray = Object.values(props.appointments)
  //Array is sorted using a compare method in an arrow function
  const sortedAppointments = appointmentsListArray.sort(
    (p1,p2)=>(p1.time>p2.time)?1:(p1.time<p2.time)?-1:0)

  console.log(sortedAppointments)
  
  const appointmentsList = appointmentsListArray.map((slot)=>{
    console.log(slot)
    return(
      <ListGroup.Item><div className="appointments"><h5>Time: {slot.time}</h5><h5>{slot.userid?`Name: ${slot.userid}`:"unbooked"}</h5>{slot.userid && <Button variant="primary">Check-in</Button>}</div></ListGroup.Item>
    )
  })

  return (
    <Card className="mb-3 clinic-card" style={{ width: '100%' }}>
      <Card.Body>
        <Card.Title>Clinic {props.name}</Card.Title>
        <Badge bg="danger" text="dark">Only 2 spots remaining</Badge>{' '}
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item className="clinic-detail">Location: {props.location}</ListGroup.Item>
        <ListGroup.Item className="clinic-detail">Date: {props.date}</ListGroup.Item>
        <ListGroup.Item className="clinic-detail">Start Time: {props.time}</ListGroup.Item>
        <ListGroup.Item className="clinic-detail">Capacity: {props.capacity}</ListGroup.Item>
        <ListGroup.Item className="clinic-detail">Status: Active</ListGroup.Item>
      </ListGroup>
      <Accordion>
        <Accordion.Item eventKey="0">
          <Accordion.Header>Appointment List</Accordion.Header>
          <Accordion.Body>
            <Card.Body>
              <ListGroup className="list-group-flush">
                {appointmentsList}
              </ListGroup>
            </Card.Body>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </Card>
  )
}
