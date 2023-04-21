import React from 'react'
import { Accordion, ListGroup} from 'react-bootstrap'

export default function HomePageInformation(props) {
    return (
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

            {/* Placeholder for statistics relating to rapid testing clinics */}
            
            {/* <Accordion.Item eventKey="1">
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
                      <Badge bg="warning" pill>{props.activeClinicCount}</Badge>
                    </ListGroup.Item>
                    <ListGroup.Item
                      as="li"
                      className="d-flex justify-content-between align-items-start"
                    >
                      <div className="ms-2 me-auto">
                        <div className="fw-bold">Live appointments</div>
                      </div>
                      <Badge bg="warning" pill>{props.liveAppointmentsCount}</Badge>
                    </ListGroup.Item>
                    <ListGroup.Item
                      as="li"
                      className="d-flex justify-content-between align-items-start"
                    >
                      <div className="ms-2 me-auto">
                        <div className="fw-bold">Completed Clinics</div>
                      </div>
                      <Badge bg="warning" pill>{props.completedClinicCount}</Badge>
                    </ListGroup.Item>
                    <ListGroup.Item
                      as="li"
                      className="d-flex justify-content-between align-items-start"
                    >
                      <div className="ms-2 me-auto">
                        <div className="fw-bold">Tests administered</div>
                      </div>
                      <Badge bg="warning" pill>{props.testsAdministeredCount}</Badge>
                    </ListGroup.Item>
                    <ListGroup.Item
                      as="li"
                      className="d-flex justify-content-between align-items-start"
                    >
                      <div className="ms-2 me-auto">
                        <div className="fw-bold">Clinic Searches</div>
                      </div>
                      <Badge bg="warning" pill>{props.clinicSearchesCount}</Badge>
                    </ListGroup.Item>
                  </ListGroup>
                </Accordion.Body>
              </Accordion.Item> */}
        </Accordion>
    )
}
