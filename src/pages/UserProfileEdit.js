import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import NavBarTRP from '../components/NavBarTRP'
import Footer from '../components/Footer'
import useDoc from '../customHooks/UseDoc'
import { firestoreUpdate } from '../firestoreFunctions/firestoreUpdate'
import usePronouns from '../customHooks/usePronouns';
import useUserRole from '../customHooks/useUserRole';
import useUserStatus from '../customHooks/useUserStatus';

/**
 * Page for editing user details
 */

export default function UserProfileEdit() {
    const navigate = useNavigate()
    const { userid } = useParams()

    //State Management
    const [userData, setUserData] = useState({})
    const [restrictedUserData, setRestrictedUserData] = useState({})

    //custom hook for standard data retrieval from firestore
    const { docData, isDocLoading, docError } = useDoc('Users', userid)
    const { docData: pronounsList, isDocLoading: pronounsLoading, docError: pronounError } = usePronouns('Supporting', 'pronouns', null)
    const { docData: statusList, isDocLoading: statusLoading, docError: statusError } = useUserStatus('Supporting', 'userStatus', null)
    const { docData: roleList, isDocLoading: rolesLoading, docError: rolesError } = useUserRole('Supporting', 'role', null)
    const { docData: restrictedData, isDocLoading: isRestrictedDataLoading, docError: restrictedDataError } = useDoc(`Users/${userid}/Restricted`, 'Details')

    //Initialise form using data retrieved using useDoc custom hook
    useEffect(() => {
        setUserData(docData)
        setRestrictedUserData(restrictedData)
    }, [docData, restrictedData])

    /**
     * Function to update user profile details within firestore database
     * @param {String} userid Firebase user id
     * @param {Object} data Object containing data to update user firestore document
     * @param {event} e Object describing the event that occurred
     */
    function updateUserDetails(userid, data, e) {
        //function to update user checkedIn status from false to true
        firestoreUpdate(`Users`, `${userid}`, data)
    }

    /**
     * Function to update restricted user details within firestore database
     * @param {String} userid Firebase user id
     * @param {Object} data containing data to update restricted user details document
     * @param {event} e Object describing event that occurred
     */
    function updateRestrictedUserDetails(userid, data, e) {
        //function to update user checkedIn status from false to true
        firestoreUpdate(`Users/${userid}/Restricted`, `Details`, data)
        navigate(`/Users/${userid}`, { state: { message: "User Details updated!" } })
    }

    /**
     * Function to handle state changes to form
     * @param {event} event Object describing event that occurred
     */
    function handleUserDataChange(event) {
        const { name, value, type, checked } = event.target
        setUserData(prevState => {
            return {
                ...prevState, [name]: type === "checkbox" ? checked : value
            }
        })
    }

     /**
     * Function to handle state changes to restricted data fields on form
     * @param {event} event Object describing event that occurred
     */
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
            <NavBarTRP/>
            <Container className='page-content'>
            <h1 className='page-title'>Edit User Details</h1>
                <Row>
                    <Form onSubmit={() => {
                        updateUserDetails(userid, userData)
                        updateRestrictedUserDetails(userid, restrictedUserData)
                    }}>
                        <Form.Group className="mb-3" >
                            <Form.Label>Role</Form.Label>
                            <Form.Select required name="role" value={restrictedUserData.role || ''} onChange={handleRestrictedDataChange}>
                            {roleList.map((item) => (<option key={item.value} value={item.value}>{item.label}</option>))}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label>Status</Form.Label>
                            <Form.Select required name="accountStatus" value={restrictedUserData.accountStatus || ''} onChange={handleRestrictedDataChange}>
                                {statusList.map((item) => (<option key={item.value} value={item.value}>{item.label}</option>))}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label>Pro-nouns</Form.Label>
                            <Form.Select required controlid="proNouns" name="ProNouns" value={userData.ProNouns || ''} onChange={handleUserDataChange}>
                                {pronounsList.map((item) => (<option key={item.value} value={item.value}>{item.label}</option>))}
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="FirstName" >
                            <Form.Label>First Name</Form.Label>
                            <Form.Control
                                required
                                name="FirstName"
                                type="text"
                                placeholder="Enter first name"
                                value={userData.FirstName || ''}
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
                            <Form.Control type="text" placeholder="Enter middle name (Optional)" name="MiddleName" value={userData.MiddleName || ''} onChange={handleUserDataChange} />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formLastName">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control required type="text" placeholder="Enter last name (Optional)" name="LastName" value={userData.LastName || ''} onChange={handleUserDataChange} />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className='mb-3' as={Col} controlId="formGridCity">
                            <Form.Label>Date of Birth</Form.Label>
                            <Form.Control
                                required
                                name="dob"
                                type="date"
                                placeholder="Enter date"
                                value={userData.dob || ''}
                                onChange={handleUserDataChange} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control disabled={true} required type="email" placeholder="Enter a valid email address" name="email" value={userData.email || ''} onChange={handleUserDataChange} />
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
                            <Form.Control required type="phone Number" placeholder="Enter contact number" name="PhoneNumber" value={userData.PhoneNumber || ''} onChange={handleUserDataChange} />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            <Form.Text className="text-muted">
                                It is important to keep contact details up to date incase direct contact is required
                            </Form.Text>
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Check
                                label="Recieve Emails Notifications"
                                checked={userData.emailOptIn || false}
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
