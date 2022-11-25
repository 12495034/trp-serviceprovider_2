import React, { useState } from 'react'
import { Container, Row, Col, Button, Table, Stack, Badge, Modal } from 'react-bootstrap'
import ClinicCard from '../components/ClinicCard'
import NavBarTRP from '../components/NavBarTRP'
import { FaCalendarCheck, FaCalendarTimes, FaCalendarWeek } from "react-icons/fa";
import AppointmentTable from '../components/AppointmentTable';
import ConfirmationBox from '../components/ConfirmationBox';


export default function ClinicDetail() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleClinicCancel = () => {
        console.log("Cancelling Clinic")
        handleClose()
    };
    const handleAddSlot = () =>{
        console.log("Adding an additional slot")
    }

    return (
        <div className='page-body'>
            <NavBarTRP />
            <Container className='page-content'>
                <Stack direction='horizontal' gap={3}>
                    <h1 className="Title">Clinic Information</h1>
                    <h4 className='ms-auto'>Queue Size</h4><Badge text='light' bg="info">4</Badge>
                    <Button onClick={handleShow}>Cancel</Button>
                    <Button variant='warning'>End</Button>
                </Stack>

                <Row>
                    <Col>
                        <ClinicCard date='21/12/2022' location='Belfast' center='LGBT Center' appointments={6} capacity={8} icon=<FaCalendarCheck size={20} color='green' /> />
                    </Col>
                </Row>
                <Row>
                    <AppointmentTable />
                </Row>
                <Row>
                    <div className='d-grid'>
                        <Button onClick={handleAddSlot}>Add Additional Slot</Button>
                    </div>
                </Row>
            </Container>

            {/* TODO: Modal is working but want it as a seperate component that can be re-used for different confirmation messages */}
            <>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Are you sure you want to cancel the clinic?</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>There are 2 appointments that are yet to be seen</Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={handleClinicCancel}>
                            Confirm
                        </Button>
                        <Button variant="secondary" onClick={handleClose}>
                            Cancel
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>

        </div>

    )
}
