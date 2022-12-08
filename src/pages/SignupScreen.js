import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { Container, Row, Col } from 'react-bootstrap'
import { useNavigate, Link } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { useContext } from 'react'
import { collection, getDocs, getDoc, setDoc, addDoc, doc } from "firebase/firestore";
import { firestore } from '../Firebase'

export default function SignupScreen() {

    //firebase references

    const navigate = useNavigate()
    const { createUser, user } = UserAuth()

    console.log(user)

    const [validated, setValidated] = useState(false);
    const [formData, setformData] = useState({
        pronouns: "",
        FirstName: "",
        MiddleName: "",
        LastName: "",
        dob:"",
        Email: "",
        PhoneNumber: "",
        Password: "",
        ConfirmPassword: "",
        isAgreedTC: false,
        role: "Service-User"
    })
    const [error, setError] = useState('');

    function handleChange(event) {
        // console.log(event.target.type)
        const { name, value, type, checked } = event.target
        setformData(prevState => {
            return {
                ...prevState, [name]: type === "checkbox" ? checked : value
            }
        })
    }

    async function handleFormSubmit(e) {
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            //stop page re-rendering after form is submitted
            e.preventDefault();
            //stop current event from propogating
            e.stopPropagation();
        }
        setValidated(true);
        //is this needed
        e.preventDefault()
        setError('')
        try {
            //create new user auth profile, then add details of user to the database using the uid as a key
            //TODO: Issue here in that it does not seem to be possible to get the uid immediatley after creating the account. Fix was UserCredential needed to be used to retrieve the user data at the time of account creation

            await createUser(formData.Email, formData.Password)
                .then(async (userCredential) => {
                    const newUser = userCredential.user
                    await setDoc(doc(firestore, "Users", newUser.uid), {
                        ProNouns: formData.pronouns,
                        FirstName: formData.FirstName,
                        MiddleName: formData.MiddleName,
                        LastName: formData.LastName,
                        dob:formData.dob,
                        Email: formData.Email,
                        PhoneNumber: formData.PhoneNumber,
                        isAgreedTC: formData.isAgreedTC,
                        Role: formData.role,
                        status: "Active"
                    })
                })
            navigate('/userProfile')
            //full object not sent as that contains password information the is send to the auth table

        } catch (e) {
            setError(e.message)
            console.log(e.message)
        }

    }

    return (
        <div className='login-body'>
            <Container className='login-content'>
                <Row md={1} sm={1} xs={1}>
                    <Col>
                        <div>
                            <h1>Create User Profile</h1>
                            <hr />
                        </div>
                        <div>
                            <Form noValidate validated={validated} onSubmit={handleFormSubmit}>

                                <Form.Group className="mb-3" >
                                    <Form.Label>Pro-nouns</Form.Label>
                                    <Form.Select required controlid="proNouns" name="pronouns" onChange={handleChange}>
                                        <option value=""></option>
                                        <option value="Not Specified">Prefer not to say</option>
                                        <option value="he/him">He/Him</option>
                                        <option value="she/her">She/Her</option>
                                        <option value="they/them">They/Them select</option>
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="FirstName" onChange={handleChange}>
                                    <Form.Label>First Name</Form.Label>
                                    <Form.Control
                                        required
                                        name="FirstName"
                                        type="text"
                                        placeholder="Enter first name" />
                                    <Form.Control.Feedback type="valid">
                                        Looks Good!
                                    </Form.Control.Feedback>
                                    <Form.Text className="text-muted">
                                        {/* //enter feed back text in this location */}
                                    </Form.Text>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formMiddleName">
                                    <Form.Label>Middle Name</Form.Label>
                                    <Form.Control type="text" placeholder="Enter middle name (Optional)" name="MiddleName" onChange={handleChange} />
                                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formLastName">
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control required type="text" placeholder="Enter last name (Optional)" name="LastName" onChange={handleChange} />
                                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className='mb-3' as={Col} controlId="formGridCity">
                                    <Form.Label>Date</Form.Label>
                                    <Form.Control
                                        required
                                        name="dob"
                                        type="date"
                                        placeholder="Enter date"
                                        onChange={handleChange}
                                        value={FormData.dob} />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formEmail">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control required type="email" placeholder="Enter a valid email address" name="Email" onChange={handleChange} />
                                    <Form.Control.Feedback type="valid">
                                        Email format is correct
                                    </Form.Control.Feedback>
                                    <Form.Control.Feedback type="invalid">
                                        Please enter a valid Email Address
                                    </Form.Control.Feedback>
                                    <Form.Text className="font-weight-bold">
                                        {error}
                                    </Form.Text>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formPhoneNumber">
                                    <Form.Label>Phone Number</Form.Label>
                                    <Form.Control required type="phone Number" placeholder="Enter contact number" name="PhoneNumber" onChange={handleChange} />
                                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                    <Form.Text className="text-muted">
                                        We Will never share your Email or telephone number with another party
                                    </Form.Text>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control required minLength={6} type="password" placeholder="Choose a password, minimum 6 characters" name="Password" onChange={handleChange} value={formData.formPassword} />
                                    <Form.Control.Feedback type="valid">
                                        Looks Good!
                                    </Form.Control.Feedback>
                                    <Form.Control.Feedback type="invalid">
                                        Please provide a password with a minimum of 6 characters
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formConfirmPassword">
                                    <Form.Label>Confirm Password</Form.Label>
                                    <Form.Control required type="password" placeholder="Confirm previously entered password" name="ConfirmPassword" onChange={handleChange} value={formData.formConfirmPassword} />
                                    <Form.Control.Feedback>
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Check
                                        required
                                        label="Agree to terms and conditions"
                                        feedback="You must agree before submitting."
                                        feedbackType="invalid"
                                        controlid="isAgreedTC"
                                        name="isAgreedTC" onChange={handleChange}
                                    />
                                </Form.Group>
                                <hr />
                                <Button variant="primary" type="submit" className='form--submit'>
                                    Create User Profile
                                </Button>
                            </Form>
                        </div>
                    </Col>
                </Row>
                <h5 className='mt-3'>Already Signed up? <Link to='/'>Login</Link></h5>
            </Container>
        </div>



    )
}

