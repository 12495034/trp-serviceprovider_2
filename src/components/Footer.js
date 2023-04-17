import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import '../styling/App.css'

export default function Footer() {
    return (
        <div className="footer">
            <Container>
                <Row>
                    <h4 className="footer-title"> Contacts</h4>
                    <Col>
                        <p className="office">
                            Belfast Office
                            23-31 Waring Street
                            Belfast
                            BT1 2DX
                            (028 9031 9030)
                        </p>
                    </Col>
                    <Col>
                        <p className="office">
                            Foyle Office
                            20 Strand Road
                            Orlan House
                            Londonderry
                            BT48 7AB
                            (028 7128 3030)
                        </p>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}
