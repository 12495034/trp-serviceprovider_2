import React from 'react'
import NavBarTRP from '../components/NavBarTRP'
import Footer from '../components/Footer'
import { Container, Row, Col } from 'react-bootstrap'
import { UserAuth } from '../context/AuthContext'
import HomePageInformation from '../components/HomePageInformation'

/**
 * Web page welcoming the user to the web app
 */

export default function Homepage() {
  //User object passed through AuthContext Provider
  const { user } = UserAuth()

  return (
    <div className='page-body'>
      <NavBarTRP />
      <Container className='page-content'>
        <Row>
          <div className="Home-message">
            <h1 className='page-title'>Welcome {user.displayName}</h1>
            <h4>to the Rapid HIV & syphillis clinic management portal</h4>
          </div>
        </Row>
        <Row>
          <Col>
            <HomePageInformation
              activeClinicCount={0}
              liveAppointmentsCount={0}
              completedClinicCount={0}
              testsAdministeredCount={0}
              clinicSearchesCount={0}
            />
          </Col>
        </Row>
        <Row md={1} sm={1} xs={1} className='page-content-cards'>
        </Row>
      </Container>
      <Footer />
    </div>
  )
}
