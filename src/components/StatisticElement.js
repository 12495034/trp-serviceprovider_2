import React from 'react'
import { Card, Stack } from 'react-bootstrap'
import '../App.css'

export default function StatisticElement(props) {
    //individual stat components would be imported into the required sheet
  return (
    <Card className='Statistic-card'>
      {/* <Card.Img variant="top" src="holder.js/100px180" alt="Add image to indicate stat"/> */}
      <Card.Body className='Statistic-card-body'>
        <Card.Title><div className='Statistic-card-title'>{props.title}{props.icon}</div></Card.Title>
        <Card.Text className='Statistic-card-description'>{props.description}</Card.Text>
        <Card.Text className='Statistic-card-count'>{props.number}</Card.Text>
      </Card.Body>
    </Card>
  )
}


