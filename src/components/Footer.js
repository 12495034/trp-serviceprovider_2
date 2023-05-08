import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import '../styling/App.css'

/**
 * Web App footer with static information
 */

export default function Footer() {
    return (
        <div className='footer'>
            <Container >
                <Row className='mb-3'>
                    <Col>
                        <p className='footer-content'>Registered with the charity Commission for Northern Ireland </p>
                        <p className='footer-content'>NIC100064</p>
                        <p className='footer-content'>A company limited by guarantee</p>
                        <p className='footer-content'>No. NI030101 Rainbow Health Ltd</p>
                    </Col>
                    <Col>
                        <p className='footer-content'>System developed as part of Msc. Software Developement Dissertation</p>
                        <p className='footer-content'>© Gavin Davis 2023 </p>
                        <p className='footer-content'>Please report any website issues to gavindave@hotmail.com</p>
                    </Col>

                </Row>
            </Container>
        </div>
    )
}
