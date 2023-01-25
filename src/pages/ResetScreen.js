import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Button, Container, Row, Col, Image, Form } from 'react-bootstrap'
import { getAuth, sendPasswordResetEmail } from 'firebase/auth'


export default function ResetScreen() {

  const [formData, setformData] = useState({
    email: "",
  })

  const [error, setError] = useState('')
  const [sent, setSent] = useState(false)

  function resetPassword(e) {
    setSent(false)
    e.preventDefault();
    const auth = getAuth();
    sendPasswordResetEmail(auth, formData.email)
      .then(() => {
        console.log("Password reset email sent")
        setError('')
        setSent(true)
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setError(error.message)
      });

  }

  function handleChange(event) {
    // console.log(event.target.type)
    const { name, value, type, checked } = event.target
    setformData(prevState => {
      return {
        ...prevState, [name]: type === "checkbox" ? checked : value
      }
    })
  }

  return (
    <div className="login-body">
      <Container className="login-content">
        <Row >
          <h1 className='text-center login-title '>Password Reset</h1>
        </Row>
        <Row md={2} sm={1} xs={2} className='d-flex justify-content-center mb-4 mt-4'>
          <Image src={require("../images/logo.png")} alt="missing" />
        </Row>
        <Row md={2} className='d-flex justify-content-center'>
          <Col>
            <Form onSubmit={resetPassword}>
              <Form.Group className="mb-3" controlId="formBasicEmail" >

                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  className="form--input"
                  name="email"
                  onChange={handleChange}
                />
                <Form.Text className="text-danger">
                  {error ? error : null}
                </Form.Text>
              </Form.Group>
              {sent ? <Form.Text className="text-success">
                Reset Email sent, please check your inbox!
              </Form.Text> : <Button variant="primary" type="submit">
                Reset Password
              </Button>}
            </Form>

          </Col>
        </Row>
        <Row>
          <Col>
            <h6 md={1} className='text-center login-options mt-4'>No registered Email? <Link to='/signup'>Signup</Link></h6>
          </Col>
          <Col>
            <h6 md={1} className='text-center mt-4'>Already Signed up? <Link to='/'>Login</Link></h6>
          </Col>
        </Row>
      </Container>
    </div >

  )
}
