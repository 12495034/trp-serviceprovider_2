import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import NavBarTRP from '../components/NavBarTRP'
import { UserAuth } from '../context/AuthContext';
import Footer from '../components/Footer'
import useDoc from '../customHooks/UseDoc'
import { firestoreUpdate } from '../firestoreFunctions/firestoreUpdate'


export default function UserProfileEdit() {
    const { user } = UserAuth();
    const navigate = useNavigate()
    const { userid } = useParams()
    //define State
    const [userData, setUserData] = useState({})
    const [restrictedUserData, setRestrictedUserData] = useState({})

    //custom hook for standard data retrieval from firestore
    const { docData, isDocLoading, docError } = useDoc('Users', userid)
    //const { docData: dropDowns, isDocLoading: dropDownsLoading, docError: dropDownsError } = useDoc('DropDownData', 'Information')
    const { docData: restrictedData, isDocLoading: isRestrictedDataLoading, docError: restrictedDataError } = useDoc(`Users/${userid}/Restricted`, 'Details')

    //issue in that the useCollection hook is not returning firestore data
    //console.log(dropDowns)

    //Initialise form using data retrieved using useDoc custom hook
    useEffect(() => {
        setUserData(docData)
        setRestrictedUserData(restrictedData)
    }, [docData, restrictedData])

    //Edit user details
    function updateUserDetails(userid, data, e) {
        //function to update user checkedIn status from false to true
        firestoreUpdate(`Users`, `${userid}`, data)
    }

    function updateRestrictedUserDetails(userid, data, e) {
        //function to update user checkedIn status from false to true
        firestoreUpdate(`Users/${userid}/Restricted`, `Details`, data)
        navigate(`/Users/${userid}`, { state: { message: "User Details updated!" } })
    }

    function handleUserDataChange(event) {
        const { name, value, type, checked } = event.target
        setUserData(prevState => {
            return {
                ...prevState, [name]: type === "checkbox" ? checked : value
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

    //-------------------------------------------------------------------------------------------------
    //  Data Rendering
    //-------------------------------------------------------------------------------------------------
    // const userStatusArray = dropDowns.userStatus
    // const userStatusList = userStatusArray.map((item, index) => {
    //     //for data security the name of the person is not shown but the id of the person is perhaps
    //     return (
    //         <option key={index.toString()} value={item}>{item}</option>
    //     )
    // })

    return (
        <div className='page-body'>
            <NavBarTRP userId={user.uid} email={user.email} />
            <Container className='page-content'>
                <Row>
                    <Form onSubmit={() => {
                        updateUserDetails(userid, userData)
                        updateRestrictedUserDetails(userid, restrictedUserData)
                    }}>
                        <Form.Group className="mb-3" >
                            <Form.Label>Role</Form.Label>
                            <Form.Select required name="role" value={restrictedUserData.role||''} onChange={handleRestrictedDataChange}>
                                <option value="Admin">Admin</option>
                                <option value="Support">Support</option>
                                <option value="Service-User">Service-User</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label>Status</Form.Label>
                            <Form.Select required name="accountStatus" value={restrictedUserData.accountStatus||''} onChange={handleRestrictedDataChange}>
                                <option value="Active">Active</option>
                                <option value="Suspended">Suspended</option>
                                {/* {userStatusList} */}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label>Pro-nouns</Form.Label>
                            <Form.Select required controlid="proNouns" name="ProNouns" value={userData.ProNouns||''} onChange={handleUserDataChange}>
                                <option value="Prefer not to say">Prefer not to say</option>
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
                                value={userData.FirstName||''}
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
                            <Form.Control type="text" placeholder="Enter middle name (Optional)" name="MiddleName" value={userData.MiddleName||''} onChange={handleUserDataChange} />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formLastName">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control required type="text" placeholder="Enter last name (Optional)" name="LastName" value={userData.LastName||''} onChange={handleUserDataChange} />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className='mb-3' as={Col} controlId="formGridCity">
                            <Form.Label>Date of Birth</Form.Label>
                            <Form.Control
                                required
                                name="dob"
                                type="date"
                                placeholder="Enter date"
                                value={userData.dob||''}
                                onChange={handleUserDataChange} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control disabled={true} required type="email" placeholder="Enter a valid email address" name="email" value={userData.email||''} onChange={handleUserDataChange} />
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
                            <Form.Control required type="phone Number" placeholder="Enter contact number" name="PhoneNumber" value={userData.PhoneNumber||''} onChange={handleUserDataChange} />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            <Form.Text className="text-muted">
                                It is important to keep contact details up to date incase direct contact is required
                            </Form.Text>
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Check
                                label="Recieve Emails Notifications"
                                checked={userData.emailOptIn||false}
                                controlid="emailOptIn"
                                name="emailOptIn"
                                onChange={handleUserDataChange}
                            />
                        </Form.Group>
                        <hr />
                        <Button style={{ width: '100%' }} variant="success" type='submit' >
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
