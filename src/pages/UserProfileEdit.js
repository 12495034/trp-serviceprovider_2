import React, { useState } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import NavBarTRP from '../components/NavBarTRP'
import Footer from '../components/Footer'
import useDoc from '../CustomHooks/UseDoc'
import { firestoreUpdate } from '../FirestoreFunctions/firestoreUpdate'

export default function UserProfileEdit() {
    const navigate = useNavigate()
    const { userid } = useParams()
    //custom hook for standard data retrieval from firestore
    const { docData, isDocLoading, docError } = useDoc('Users', userid, null)
    //Define State
    const [userData, setUserData] = useState({
        ProNouns: "",
        FirstName: "",
        MiddleName: "",
        LastName: "",
        dob: "",
        Email: "",
        PhoneNumber: "",
        status: "",
        Role: "",
    })

    setUserData()

    //Edit user details
    function updateUserDetails(userid, data) {
        //function to update user checkedIn status from false to true
        firestoreUpdate(`Users`, `${userid}`, data)
        //navigate back to user detail screen following update of information
        navigate(`/Users/${userid}`);
    }

    function handleChange(event) {
        // console.log(event.target.type)
        const { name, value, type, checked } = event.target
        setUserData(prevState => {
            return {
                ...prevState, [name]: type === "checkbox" ? checked : value
            }
        })
    }

    return (
        <div className='page-body'>
            <NavBarTRP />
            <Container className='page-content'>
                <Row>
                    <Form onSubmit={() => { updateUserDetails(userid, userData) }}>
                        <Form.Group className="mb-3" >
                            <Form.Label>Role</Form.Label>
                            <Form.Select required name="Role" value={docData.Role} onChange={handleChange}>
                                <option value="Admin">Admin</option>
                                <option value="Service-User">Service-User</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label>Status</Form.Label>
                            <Form.Select required name="status" value={docData.status} onChange={handleChange}>
                                <option value="Active">Active</option>
                                <option value="Suspended">Suspended</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label>Pro-nouns</Form.Label>
                            <Form.Select required controlid="proNouns" name="ProNouns" value={docData.ProNouns} onChange={handleChange}>
                                <option value="Not Specified">Prefer not to say</option>
                                <option value="he/him">He/Him</option>
                                <option value="she/her">She/Her</option>
                                <option value="they/them">They/Them select</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="FirstName" >
                            <Form.Label>First Name</Form.Label>
                            <Form.Control
                                required
                                name="FirstName"
                                type="text"
                                placeholder="Enter first name"
                                value={docData.FirstName}
                                onChange={handleChange} />
                            <Form.Control.Feedback type="valid">
                                Looks Good!
                            </Form.Control.Feedback>
                            <Form.Text className="text-muted">
                                {/* //enter feed back text in this location */}
                            </Form.Text>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formMiddleName">
                            <Form.Label>Middle Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter middle name (Optional)" name="MiddleName" value={docData.MiddleName} onChange={handleChange} />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formLastName">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control required type="text" placeholder="Enter last name (Optional)" name="LastName" value={docData.LastName} onChange={handleChange} />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className='mb-3' as={Col} controlId="formGridCity">
                            <Form.Label>Date of Birth</Form.Label>
                            <Form.Control
                                required
                                name="dob"
                                type="date"
                                placeholder="Enter date"
                                value={docData.dob}
                                onChange={handleChange} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control disabled={true} required type="email" placeholder="Enter a valid email address" name="Email" value={docData.Email} />
                            <Form.Control.Feedback type="valid">
                                Email format is correct
                            </Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">
                                Please enter a valid Email Address
                            </Form.Control.Feedback>
                            <Form.Text className="font-weight-bold">
                            </Form.Text>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formPhoneNumber">
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control required type="phone Number" placeholder="Enter contact number" name="PhoneNumber" value={docData.PhoneNumber} onChange={handleChange} />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            <Form.Text className="text-muted">
                                It is important to keep contact details up to date incase direct contact is required
                            </Form.Text>
                        </Form.Group>
                        <hr />
                        <Button style={{ width: '100%' }} variant="primary" type="submit" className='form--submit'>
                            Save Changes
                        </Button>
                    </Form>
                </Row>
                <br></br>
            </Container>
            <Footer />
        </div>
    )

}
