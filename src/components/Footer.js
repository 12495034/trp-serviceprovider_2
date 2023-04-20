import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import '../styling/App.css'

export default function Footer() {
    return (
        <div className='footer'>
            <Container >
                <Row>
                    <h4 className="footer-title"> Offices</h4>
                    <Col className='footer-content'>
                        <p className='footer-content'>LGBT Center </p>
                        <p className='footer-content'>23-31 Waring Street</p>
                        <p className='footer-content'>Belfast</p>
                        <p className='footer-content'>BT1 2DX</p>
                        <p className='footer-content'>(028 9031 9030)</p>
                    </Col>
                    <Col className='footer-content'>
                        <p className='footer-content'>Foyle Office </p>
                        <p className='footer-content'>20 Strand Road</p>
                        <p className='footer-content'>Orlan House</p>
                        <p className='footer-content'>Londonderry</p>
                        <p className='footer-content'>BT48 7AB</p>
                        <p className='footer-content'>(028 7128 3030)</p>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}
