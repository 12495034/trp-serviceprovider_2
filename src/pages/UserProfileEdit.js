import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'

import NavBarTRP from '../components/NavBarTRP'
import Footer from '../components/Footer'

import { getDoc, doc, updateDoc } from "firebase/firestore";
import { firestore } from '../Firebase'

export default function UserProfileEdit() {

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

    console.log(userData)

    const navigate = useNavigate()
    const { userid } = useParams()

    useEffect(() => {
        fetchUser(userid)
    }, [])

    //Edit user details
    function updateUserDetails(userid, object) {
        //function to update user checkedIn status from false to true
        const docRef = doc(firestore, `Users/${userid}`);
        const data = object
        updateDoc(docRef, data)
            .then(docRef => {
                console.log("Value of an Existing Document Field has been updated");
            })
            .catch(error => {
                console.log(error);
            })
        //navigate back to user detail screen following update of information
        navigate(`/Users/${userid}`);
    }

    async function fetchUser(firestoreUserId) {
        //button has been setup to call the firestore database and get the user info if available
        //This aspect of the code is functioning correctly, manually added document and the data imported
        const docRef = doc(firestore, "Users", firestoreUserId)
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            setUserData(docSnap.data())
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
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
                            <Form.Select required name="Role" value={userData.Role} onChange={handleChange}>
                                <option value="Admin">Admin</option>
                                <option value="Service-User">Service-User</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label>Status</Form.Label>
                            <Form.Select required name="status" value={userData.status} onChange={handleChange}>
                                <option value="Active">Active</option>
                                <option value="Suspended">Suspended</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label>Pro-nouns</Form.Label>
                            <Form.Select required controlid="proNouns" name="ProNouns" value={userData.ProNouns} onChange={handleChange}>
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
                            <Form.Control type="text" placeholder="Enter middle name (Optional)" name="MiddleName" value={userData.MiddleName} onChange={handleChange} />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formLastName">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control required type="text" placeholder="Enter last name (Optional)" name="LastName" value={userData.LastName} onChange={handleChange} />
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
                                onChange={handleChange} />
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
                            <Form.Control required type="phone Number" placeholder="Enter contact number" name="PhoneNumber" value={userData.PhoneNumber} onChange={handleChange} />
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            <Form.Text className="text-muted">
                                It is important to keep contact details up to date incase direct contact is required
                            </Form.Text>
                        </Form.Group>
                        <hr />
                        <Button variant="primary" type="submit" className='form--submit'>
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
