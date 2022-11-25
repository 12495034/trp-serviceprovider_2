import React, { useState } from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { Container, Row, Col } from 'react-bootstrap'
import { useNavigate, Link } from 'react-router-dom'
import { UserAuth } from '../context/AuthContext'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { useContext } from 'react'

export default function SignupScreen() {

    const navigate = useNavigate()
    const { createUser } = UserAuth()
    const [validated, setValidated] = useState(false);
    const [formData, setformData] = useState({
        pronouns: "",
        formFirstName: "",
        formMiddleName: "",
        formLastName: "",
        formEmail: "",
        formPhoneNumber: "",
        formPassword: "",
        formConfirmPassword: "",
        isAgreedTC: false,
    })
    const [error, setError] = useState('');

    console.log(formData.formEmail, formData.formPassword)

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
            await createUser(formData.formEmail, formData.formPassword)
            navigate('/userProfile')
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
                            <Form.Group className="mb-3" controlId="formFirstName" onChange={handleChange}>
                                <Form.Label>First Name</Form.Label>
                                <Form.Control
                                    required
                                    name="formFirstName"
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
                                <Form.Control type="text" placeholder="Enter middle name (Optional)" name="formMiddleName" onChange={handleChange} />
                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formLastName">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control required type="text" placeholder="Enter middle name (Optional)" name="formLastName" onChange={handleChange} />
                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control required type="email" placeholder="Enter a valid email address" name="formEmail" onChange={handleChange} />
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
                                <Form.Control required type="phone Number" placeholder="Enter contact number" name="formPhoneNumber" onChange={handleChange} />
                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                <Form.Text className="text-muted">
                                    We Will never share your Email or telephone number with another party
                                </Form.Text>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control required minLength={6} type="password" placeholder="Choose a password, minimum 6 characters" name="formPassword" onChange={handleChange} value={formData.formPassword} />
                                <Form.Control.Feedback type="valid">
                                    Looks Good!
                                </Form.Control.Feedback>
                                <Form.Control.Feedback type="invalid">
                                    Please provide a password with a minimum of 6 characters
                                </Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formConfirmPassword">
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control required type="password" placeholder="Confirm previously entered password" name="formConfirmPassword" onChange={handleChange} value={formData.formConfirmPassword} />
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

