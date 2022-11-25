import React from 'react'
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';
import Accordion from 'react-bootstrap/Accordion';
import { Button } from 'react-bootstrap';



export default function AppointmentCard(props) {
  return (
    <div className='appointment-card'>
      <div>{props.date}</div>
      <div>{props.location}</div>
      <div>{props.center}</div>
      <div>{props.icon}</div>
    </div>
  )
}
