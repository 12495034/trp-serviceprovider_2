import React from 'react'
import NavBarTRP from '../components/NavBarTRP'
import Footer from '../components/Footer'
import { Container, Row, Col, ListGroup, Badge, Accordion } from 'react-bootstrap'
import { UserAuth } from '../context/AuthContext'

export default function Homepage() {
  //functions passed to screen through context
  const { user, role } = UserAuth()

  return (
    <div className='page-body'>
      <NavBarTRP />
      <Container className='page-content'>
        <Row className='page-content-text'>
          <div className="Home-message">
            <h2>Welcome {user.displayName}</h2>
            <h4>to the Rapid HIV & syphillis clinic management portal you have {role} privileges</h4>
          </div>
        </Row>
        <Row>
          <Col>
            <Accordion defaultActiveKey="0">
              <Accordion.Item eventKey="0">
                <Accordion.Header>What does the system do?</Accordion.Header>
                <Accordion.Body>
                  <ListGroup variant='flush'>
                    <ListGroup.Item variant='info flush'>Clinic Management</ListGroup.Item>
                    <ListGroup.Item>
                      <ListGroup variant='flush'>
                        <ListGroup.Item>Get real time update to date information on active clinics</ListGroup.Item>
                        <ListGroup.Item>View and manage the appointment list in real time</ListGroup.Item>
                        <ListGroup.Item>Check in users, call the next appointment and mark users as tested</ListGroup.Item>
                        <ListGroup.Item>When everything is wrapped up close the clinic</ListGroup.Item>
                        <ListGroup.Item>If the unforseen happens cancel the clinic</ListGroup.Item>
                      </ListGroup>
                    </ListGroup.Item>
                    <ListGroup.Item variant='info flush'>User Management</ListGroup.Item>
                    <ListGroup.Item>
                      <ListGroup variant='flush'>
                        <ListGroup.Item>Search for users signed up to the App</ListGroup.Item>
                        <ListGroup.Item>View and edit profile details, including user roles and account status</ListGroup.Item>
                      </ListGroup>
                    </ListGroup.Item>
                  </ListGroup>
                </Accordion.Body>
              </Accordion.Item>

              <Accordion.Item eventKey="1">
                <Accordion.Header>What is the current testing clinic activity?</Accordion.Header>
                <Accordion.Body>
                  <ListGroup as="ol" numbered>
                    <ListGroup.Item
                      as="li"
                      className="d-flex justify-content-between align-items-start"
                    >
                      <div className="ms-2 me-auto">
                        <div className="fw-bold">Active Clinics</div>
                        Clinics that have been schedule but are yet to be held
                      </div>
                      <Badge bg="warning" pill>Future implementation</Badge>
                    </ListGroup.Item>
                    <ListGroup.Item
                      as="li"
                      className="d-flex justify-content-between align-items-start"
                    >
                      <div className="ms-2 me-auto">
                        <div className="fw-bold">Live appointments</div>
                        Service users currently waiting for a test
                      </div>
                      <Badge bg="warning" pill>Future implementation</Badge>
                    </ListGroup.Item>
                    <ListGroup.Item
                      as="li"
                      className="d-flex justify-content-between align-items-start"
                    >
                      <div className="ms-2 me-auto">
                        <div className="fw-bold">Completed Clinics</div>
                        Clinics that have been held and tests administered
                      </div>
                      <Badge bg="warning" pill>Future implementation</Badge>
                    </ListGroup.Item>
                    <ListGroup.Item
                      as="li"
                      className="d-flex justify-content-between align-items-start"
                    >
                      <div className="ms-2 me-auto">
                        <div className="fw-bold">Tests administered</div>
                        The number of tests administered since the system went live
                      </div>
                      <Badge bg="warning" pill>Future implementation</Badge>
                    </ListGroup.Item>
                    <ListGroup.Item
                      as="li"
                      className="d-flex justify-content-between align-items-start"
                    >
                      <div className="ms-2 me-auto">
                        <div className="fw-bold">Clinic Searches</div>
                        The number of times users have enquired within a clinic to view the booking slots available
                      </div>
                      <Badge bg="warning" pill>Future implementation</Badge>
                    </ListGroup.Item>
                  </ListGroup>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Col>
        </Row>
        <Row md={1} sm={1} xs={1} className='page-content-cards'>
        </Row>
      </Container>
      <Footer />
    </div>
  )
}
