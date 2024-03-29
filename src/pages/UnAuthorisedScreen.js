import React from 'react'
import { Button, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

/**
 * Screen shown to un-authenticated users or those with in-sufficient permissions
 */

export default function UnAuthorisedScreen() {
    const navigate = useNavigate()
    return (
        <Container>
            <Row md={1} sm={1} xs={1} className=' mb-4 mt-4'>
                <Col>
                    <h1 className='d-flex justify-content-center mb-4 mt-4'><code>Access Denied</code></h1>
                    <h3 className='d-flex justify-content-center mb-4 mt-4'>You have in-sufficient permissions to view this site</h3>
                    <h4 className='d-flex justify-content-center mb-4 mt-4'>If you are a new user and require access to this resource please contact Leo Lardie at 'The Rainbow Project'</h4>
                    <h5 className='d-flex justify-content-center mb-4 mt-4'>error code:403 forbidden</h5>
                    <Button style={{ width: '100%' }}
                        onClick={() => navigate('/')}
                        variant="primary">
                        Return to login Screen
                    </Button>
                </Col>
            </Row>
        </Container>
    )
}
