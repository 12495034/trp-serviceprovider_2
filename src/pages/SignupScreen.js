import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { Container, Row, Col } from 'react-bootstrap'
import { useNavigate, Link } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext'
import { handlePasswordConfirmation } from '../Functions/SpecialFunctions/handlePasswordConfirmation'
import { setDoc, doc } from "firebase/firestore";
import { firestore } from '../config/Firebase'
import { Timestamp } from 'firebase/firestore'
import ModalTAC from '../components/ModalTAC'
import usePronouns from '../customHooks/usePronouns'

/**
 * Web app screen for users to create a new profile
 */

export default function SignupScreen() {
    //useNavigate hook from react router dom
    const navigate = useNavigate()
    //state management
    const [modalShow, setModalShow] = useState(false);
    //modal state handling
    const handleClose = () => setModalShow(false);
    const handleShow = () => setModalShow(true);

    //functions passed to screen by AuthContext provider
    const { createUser, verifyEmail, updateUserAuthProfile, logOut } = UserAuth()

    //state Management
    const [validated, setValidated] = useState(false);
    const [formData, setformData] = useState({
        pronouns: "",
        FirstName: "",
        MiddleName: "",
        LastName: "",
        dob: "",
        email: "",
        PhoneNumber: "",
        Password: "",
        ConfirmPassword: "",
        isAgreedTC: "",
        emailOptIn: false,
    })
    const [error, setError] = useState('');

    //Custom hookes for drop down menu population
    const { docData, isDocLoading, docError } = usePronouns('Supporting', 'pronouns', null)

    /**
     * Function to handle changes to signup form
     * @param {event} event Object describing the event that occurred
     * @returns setFormData state
     */
    function handleChange(event) {
        const { name, value, type, checked } = event.target
        setformData(prevState => {
            return {
                ...prevState, [name]: type === "checkbox" ? checked : value
            }
        })
    }

    /**
     * Function to set state of terms and conditions sign up, followed by closing of the modal
     * @returns setFormData state
     */
    function agreeTAC() {
        setformData(prevState => {
            return {
                ...prevState, isAgreedTC: true
            }
        })
        setModalShow(false)
    }

    /**
     * Function handles submission of form to firebase for user account creations
     * @param {event} e Object describing the event that occurred
     */
    async function handleFormSubmit(e) {
        const form = e.currentTarget;

        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
            setValidated(true);
        } else {
            e.preventDefault()
            setError('')
            setValidated(true);
            try {
                await createUser(formData.email, formData.Password)
                    .then(async (userCredential) => {
                        const newUser = userCredential.user
                        //create new firestore database record with newly created firebase user id
                        await setDoc(doc(firestore, "Users", newUser.uid), {
                            ProNouns: formData.pronouns,
                            FirstName: formData.FirstName.charAt(0).toUpperCase() + formData.FirstName.slice(1),
                            MiddleName: formData.MiddleName.charAt(0).toUpperCase() + formData.MiddleName.slice(1),
                            LastName: formData.LastName.charAt(0).toUpperCase() + formData.LastName.slice(1),
                            dob: formData.dob,
                            email: formData.email,
                            PhoneNumber: formData.PhoneNumber,
                            isAgreedTC: formData.isAgreedTC,
                            emailOptIn: formData.emailOptIn,
                            createdAt: Timestamp.fromDate(new Date()),
                        })
                        //update user auth profile with firstname, lastname and phoneNumber
                        updateUserAuthProfile(formData.FirstName, formData.LastName, formData.PhoneNumber)
                        //sends verification email to users email address
                        verifyEmail()
                        //navigate to welcome page following user sign up
                        navigate('/welcome')
                    })
            } catch (e) {
                //error set in state and rendered within UI
                setError(e.message)
            }
        }
    }

    return (
        <div className='login-body'>
            <Container className='login-content'>
                <Row md={1} sm={1} xs={1}>
                    <Col>
                        <Row >
                            <h1 className='text-center login-title '>Create a new Account</h1>
                        </Row>
                        <div>
                            <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
                                <Form.Group className="mb-3" >
                                    <Form.Label>Pro-nouns</Form.Label>
                                    <Form.Select
                                        required
                                        controlid="proNouns"
                                        name="pronouns"
                                        onChange={handleChange}>
                                        {docData.map((item) => (<option key={item.value} value={item.value}>{item.label}</option>))}

                                    </Form.Select>
                                    <Form.Control.Feedback type="valid">
                                        Looks Good!
                                    </Form.Control.Feedback>
                                    <Form.Control.Feedback type="invalid">
                                        Please select your preferred pro nouns
                                    </Form.Control.Feedback>
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
                                    <Form.Control.Feedback type="invalid">
                                        Please enter a first name
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formMiddleName">
                                    <Form.Label>Middle Name</Form.Label>
                                    <Form.Control type="text" placeholder="Enter middle name (Optional)" name="MiddleName" onChange={handleChange} />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formLastName">
                                    <Form.Label>Last Name</Form.Label>
                                    <Form.Control required type="text" placeholder="Enter last name" name="LastName" onChange={handleChange} />
                                    <Form.Control.Feedback type="valid">
                                        looks good!
                                    </Form.Control.Feedback>
                                    <Form.Control.Feedback type="invalid">
                                        Please enter a last name
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className='mb-3' as={Col} controlId="formGridCity">
                                    <Form.Label>Date of birth</Form.Label>
                                    <Form.Control
                                        required
                                        name="dob"
                                        type="date"
                                        placeholder="Enter date"
                                        onChange={handleChange}
                                        value={FormData.dob} />
                                    <Form.Control.Feedback type="valid">
                                        looks good!
                                    </Form.Control.Feedback>
                                    <Form.Control.Feedback type="invalid">
                                        Please enter a valid date of birth
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formEmail">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control required type="email" placeholder="Enter a valid email address" name="email" onChange={handleChange} />
                                    <Form.Control.Feedback type="valid">
                                        Email format is correct
                                    </Form.Control.Feedback>
                                    <Form.Control.Feedback type="invalid">
                                        Please enter a valid Email Address
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formPhoneNumber">
                                    <Form.Label>Phone Number</Form.Label>
                                    <Form.Control required={true} type="phone Number" placeholder="Enter contact number" name="PhoneNumber" onChange={handleChange} />
                                    <Form.Control.Feedback type="valid">
                                        looks good!
                                    </Form.Control.Feedback>
                                    <Form.Control.Feedback type="invalid">
                                        Please enter a valid contact number
                                    </Form.Control.Feedback>
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
                                    <Form.Control required minLength={formData.Password.length} type="password" placeholder="Confirm previously entered password" name="ConfirmPassword" onChange={handleChange} value={formData.ConfirmPassword} />
                                    {handlePasswordConfirmation(formData.Password, formData.ConfirmPassword)}
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Check
                                        required
                                        checked={formData.isAgreedTC}
                                        label="Agree to terms and conditions"
                                        feedback="You must agree before submitting."
                                        feedbackType="invalid"
                                        controlid="isAgreedTC"
                                        name="isAgreedTC"
                                        value={formData.isAgreedTC}
                                        onChange={() => setModalShow(true)}
                                    />
                                    <Form.Check
                                        checked={formData.emailOptIn}
                                        value={formData.emailOptIn}
                                        label="Recieve Emails about new Clinics"
                                        controlid="emailOptIn"
                                        name="emailOptIn"
                                        onChange={handleChange}
                                    />
                                </Form.Group>
                                <hr />
                                <Form.Group>
                                    <Form.Text className="text-danger">{error}</Form.Text>
                                    <Button style={{ width: '100%', marginBottom: '5px' }} variant="primary" type="submit" className='form--submit'>
                                        Create User Profile
                                    </Button>
                                </Form.Group>
                            </Form>
                        </div>
                    </Col>
                </Row>
                <h6 className='mt-3'>Already Signed up? <Link to='/'>Login</Link></h6>
            </Container>

            <ModalTAC
                show={modalShow}
                close={handleClose}
                updateFunction={() => agreeTAC()}
            />
        </div>



    )
}

