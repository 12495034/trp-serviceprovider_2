import React from 'react'
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';
import Accordion from 'react-bootstrap/Accordion';
import { Button } from 'react-bootstrap';



export default function ClinicCard(props) {

  // //object must be converted to an array to map to the appointment list
  // const appointmentsListArray = Object.values(props.appointments)
  // //Array is sorted using a compare method in an arrow function
  // const sortedAppointments = appointmentsListArray.sort(
  //   (p1, p2) => (p1.time > p2.time) ? 1 : (p1.time < p2.time) ? -1 : 0)

  // console.log(sortedAppointments)

  // const appointmentsList = appointmentsListArray.map((slot) => {
  //   console.log(slot)
  //   return (
  //     <ListGroup.Item><div className="appointments"><h5>Time: {slot.time}</h5><h5>{slot.userid ? `Name: ${slot.userid}` : "unbooked"}</h5>{slot.userid && <Button variant="primary">Check-in</Button>}</div></ListGroup.Item>
  //   )
  // })

  return (
    <div className='clinic-card'>
      <div>{props.date}</div>
      <div>{props.location}</div>
      <div>{props.center}</div>
      <div>{props.appointments}/{props.capacity}</div>
      <div>{props.icon}</div>
    </div>
  )
}
