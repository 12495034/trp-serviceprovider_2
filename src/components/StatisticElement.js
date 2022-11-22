import React from 'react'
import { Card } from 'react-bootstrap'

export default function StatisticElement(props) {
    //individual stat components would be imported into the required sheet
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src="holder.js/100px180" alt="Add image to indicate stat"/>
      <Card.Body>
        <Card.Title>{props.title}</Card.Title>
        <Card.Text>{props.number}</Card.Text>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
      </Card.Body>
    </Card>
  )
}
