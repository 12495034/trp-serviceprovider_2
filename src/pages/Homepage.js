import React from 'react'
import { Link } from 'react-router-dom'
import NavBarTRP from '../components/NavBarTRP'
import Footer from '../components/Footer'
import StatisticElement from '../components/StatisticElement'
import { Container, Row, Col } from 'react-bootstrap'

//TODO: Add footer
export default function Homepage() {
  return (
    <div>
      <NavBarTRP />
      <Container>
        <Row>
          <div className="Home-message">
            <h1>Welcome (username)</h1>
            <h3>to the Rapid HIV & syphillis clinic management portal. Through this system you can collect statistics about clinics held to date, schedule/manage clinics and manage user access to this service.  </h3>
            <p>Statistics shown below shall be pulled from an online database and dynamically rendered</p>
          </div>
        </Row>
        <Row>
          <Col>
          <StatisticElement title="Clinics Held" number="4" />
          </Col>
          <Col>
          <StatisticElement title="Tests Carried Out" number="4" />
          </Col>
          <Col>
          <StatisticElement title="No Shows" number="4" />
          </Col>
          <Col>
          <StatisticElement title="Average Queue Size" number="4" />
          </Col>
          
        </Row>
      </Container>

    </div>
  )
}
