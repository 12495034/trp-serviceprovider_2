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
        <Row>
          <div className="Home-message">
            <h1 className='page-title'>Welcome {user.displayName}</h1>
            <h4>to the Rapid HIV & syphillis clinic management portal</h4>
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
                      </div>
                      <Badge bg="warning" pill>TBD</Badge>
                    </ListGroup.Item>
                    <ListGroup.Item
                      as="li"
                      className="d-flex justify-content-between align-items-start"
                    >
                      <div className="ms-2 me-auto">
                        <div className="fw-bold">Live appointments</div>
                      </div>
                      <Badge bg="warning" pill>TBD</Badge>
                    </ListGroup.Item>
                    <ListGroup.Item
                      as="li"
                      className="d-flex justify-content-between align-items-start"
                    >
                      <div className="ms-2 me-auto">
                        <div className="fw-bold">Completed Clinics</div>
                      </div>
                      <Badge bg="warning" pill>TBD</Badge>
                    </ListGroup.Item>
                    <ListGroup.Item
                      as="li"
                      className="d-flex justify-content-between align-items-start"
                    >
                      <div className="ms-2 me-auto">
                        <div className="fw-bold">Tests administered</div>
                      </div>
                      <Badge bg="warning" pill>TBD</Badge>
                    </ListGroup.Item>
                    <ListGroup.Item
                      as="li"
                      className="d-flex justify-content-between align-items-start"
                    >
                      <div className="ms-2 me-auto">
                        <div className="fw-bold">Clinic Searches</div>
                      </div>
                      <Badge bg="warning" pill>TBD</Badge>
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
