import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Container, Row, Col, Image } from 'react-bootstrap'
import { UserAuth } from '../context/AuthContext'

export default function WelcomeScreen() {
    const { user, role, accountStatus, logOut } = UserAuth();
    const navigate = useNavigate()

    async function handleSignOut() {
        console.log("un-authorised user, signing out....")
        try {
            await logOut()
        } catch (e) {
            console.log(e.message)
        }
    }

    return (
        <div>
            <Container>
                <Row md={1} sm={1} xs={1} className=' mb-4 mt-4'>
                    <Col>
                        <h1 className='d-flex justify-content-center mb-4 mt-4 text-success'>Thankyou for registering....</h1>
                        <h2 className='d-flex justify-content-center mb-4 mt-4 text-danger'>Please not that this system is part of a university dissertation and not currently a live system</h2>
                        <h3 className='d-flex justify-content-center mb-4 mt-4'>The Rapid HIV testing management portal is a new system to facilitate scheduling and management of rapid HIV testing clinics. Clinics are scheduled through the management portal, which service users can book an appointment in using 'The rapid HIV testing' mobile app.</h3>
                        <h4 className='d-flex justify-content-center mb-4 mt-4'>This resource is for rainbow project staff only. If you require access to this resource please contact Leo Lardie at 'The Rainbow Project</h4>
                        <h5 className='justify-content-center mb-4 mt-4'>If you encounter any errors while using this site please contact the developer at 'gavindave@hotmail.com'</h5>
                        <Button style={{ width: '100%' }}
                            onClick={() => {
                                handleSignOut()
                                navigate('/')
                            }}
                            variant="primary">
                            Return to login Screen
                        </Button>
                    </Col>
                </Row>
            </Container>
        </div >
    )
}
