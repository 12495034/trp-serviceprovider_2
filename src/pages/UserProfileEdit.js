import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import NavBarTRP from '../components/NavBarTRP'
import Footer from '../components/Footer'
import useDoc from '../CustomHooks/UseDoc'
import { firestoreUpdate } from '../FirestoreFunctions/firestoreUpdate'

export default function UserProfileEdit() {
    const navigate = useNavigate()
    const { userid } = useParams()
    //define State
    const [userData, setUserData] = useState({
        ProNouns: '',
        FirstName: '',
        MiddleName: '',
        LastName: '',
        PhoneNumber: '',
        dob: '',
        isAgreed: '',
        Email: '',
        createdAt: '',
    })
    const [restrictedUserData, setRestrictedUserData] = useState({
        role: undefined,
        accountStatus: undefined,
    })

    //custom hook for standard data retrieval from firestore
    const { docData, isDocLoading, docError } = useDoc('Users', userid)
    const { docData: restrictedData, isDocLoading: isRestrictedDataLoading, docError: restrictedDataError } = useDoc(`Users/${userid}/Restricted`, 'Details')

    //Initialise form using data retrieved using useDoc custom hook
    useEffect(() => {
        setUserData(docData)
        setRestrictedUserData(restrictedData)
    }, [docData, restrictedData])

    //Edit user details
    function updateUserDetails(userid, data) {
        //function to update user checkedIn status from false to true
        firestoreUpdate(`Users`, `${userid}`, data)
        //navigate back to user detail screen following update of information
    }

    function updateRestrictedUserDetails(userid, data) {
        //function to update user checkedIn status from false to true
        firestoreUpdate(`Users/${userid}/Restricted`, `Details`, data)
        //navigate back to user detail screen following update of information
        navigate(`/Users/${userid}`, { state: { message: "User Details Updated" } });
    }

    function handleUserDataChange(event) {
        // console.log(event.target.type)
        const { name, value } = event.target
        setUserData(prevState => {
            return {
                ...prevState, [name]: value
            }
        })
    }

    function handleRestrictedDataChange(event) {
        const { name, value } = event.target
        setRestrictedUserData(prevState => {
            return {
                ...prevState, [name]: value
            }
        })
    }

    return (
        <div className='page-body'>
            <NavBarTRP />
            <Container className='page-content'>
                <Row>
                    <Form onSubmit={() => {
                        updateUserDetails(userid, userData)
                        updateRestrictedUserDetails(userid, restrictedUserData)
                    }}>
                        <Form.Group className="mb-3" >
                            <Form.Label>Role</Form.Label>
                            <Form.Select required name="role" value={restrictedUserData.role} onChange={handleRestrictedDataChange}>
                                <option value="Admin">Admin</option>
                                <option value="Support">Support</option>
                                <option value="Service-User">Service-User</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label>Status</Form.Label>
                            <Form.Select required name="accountStatus" value={restrictedUserData.accountStatus} onChange={handleRestrictedDataChange}>
                                <option value="Active">Active</option>
                                <option value="Suspended">Suspended</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label>Pro-nouns</Form.Label>
                            <Form.Select required controlid="proNouns" name="ProNouns" value={userData.ProNouns} onChange={handleUserDataChange}>
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
                                value={userData.FirstName}
                                onChange={handleUserDataChange} />
                            <Form.Control.Feedback type="valid">
                                Looks Good!
                            </Form.Control.Feedback>
                            <Form.Text className="text-muted">
                                {/* //enter feed back text in this location */}
                            </Form.Text>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formMiddleName">
                            <Form.Label>Middle Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter middle name (Optional)" name="MiddleName" value={userData.MiddleName} onChange={handleUserDataChange} />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formLastName">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control required type="text" placeholder="Enter last name (Optional)" name="LastName" value={userData.LastName} onChange={handleUserDataChange} />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className='mb-3' as={Col} controlId="formGridCity">
                            <Form.Label>Date of Birth</Form.Label>
                            <Form.Control
                                required
                                name="dob"
                                type="date"
                                placeholder="Enter date"
                                value={userData.dob}
                                onChange={handleUserDataChange} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control disabled={true} required type="email" placeholder="Enter a valid email address" name="Email" value={userData.Email} />
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
                            <Form.Control required type="phone Number" placeholder="Enter contact number" name="PhoneNumber" value={userData.PhoneNumber} onChange={handleUserDataChange} />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            <Form.Text className="text-muted">
                                It is important to keep contact details up to date incase direct contact is required
                            </Form.Text>
                        </Form.Group>
                        <hr />
                        <Button style={{ width: '100%' }} variant="success" type='submit' className='form--submit'>
                            Save Changes
                        </Button>
                        <Button style={{ width: '100%' }} variant="warning" type='button' onClick={() => navigate(`/Users/${userid}`)}>
                            Cancel Changes
                        </Button>
                    </Form>

                </Row>
                <br></br>
            </Container>
            <Footer />
        </div >
    )

}
