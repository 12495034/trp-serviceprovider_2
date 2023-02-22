import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { Container, Row, Col} from 'react-bootstrap'
import { useNavigate, Link } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext'
import { handlePasswordConfirmation } from '../Functions/GeneralFunctions'
import { setDoc, doc } from "firebase/firestore";
import { firestore } from '../Firebase'

export default function SignupScreen() {
    //useNavigate hook from react router dom
    const navigate = useNavigate()
    //functions passed to screen by context
    const { createUser, verifyEmail, updateUserAuthProfile } = UserAuth()
    //state
    const [validated, setValidated] = useState(false);
    const [formData, setformData] = useState({
        pronouns: "",
        FirstName: "",
        MiddleName: "",
        LastName: "",
        dob: "",
        Email: "",
        PhoneNumber: "",
        Password: "",
        ConfirmPassword: "",
        isAgreedTC: false,
    })
    const [error, setError] = useState('');

    function handleChange(event) {
        const { name, value, type, checked } = event.target
        setformData(prevState => {
            return {
                ...prevState, [name]: type === "checkbox" ? checked : value
            }
        })
    }

    async function handleFormSubmit(e) {
        const form = e.currentTarget;
        console.log(form.checkValidity())
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
            setValidated(true);
        } else {
            e.preventDefault()
            console.log(formData)
            setError('')
            setValidated(true);
            try {
                await createUser(formData.Email, formData.Password)
                    .then(async (userCredential) => {
                        const newUser = userCredential.user
                        await setDoc(doc(firestore, "Users", newUser.uid), {
                            ProNouns: formData.pronouns,
                            FirstName: formData.FirstName,
                            MiddleName: formData.MiddleName,
                            LastName: formData.LastName,
                            dob: formData.dob,
                            Email: formData.Email,
                            PhoneNumber: formData.PhoneNumber,
                            isAgreedTC: formData.isAgreedTC,
                            Role: formData.role,
                            status: "Active"
                        })
                        updateUserAuthProfile(formData.FirstName, formData.LastName, formData.PhoneNumber)
                        verifyEmail()
                    })
                navigate('/home')
            } catch (e) {
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
                                        <option value=""></option>
                                        <option value="Not Specified">Prefer not to say</option>
                                        <option value="he/him">He/Him</option>
                                        <option value="she/her">She/Her</option>
                                        <option value="they/them">They/Them select</option>
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
                                    <Form.Control required type="email" placeholder="Enter a valid email address" name="Email" onChange={handleChange} />
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
                                        label="Agree to terms and conditions"
                                        feedback="You must agree before submitting."
                                        feedbackType="invalid"
                                        controlid="isAgreedTC"
                                        name="isAgreedTC" onChange={handleChange}
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
        </div>



    )
}

