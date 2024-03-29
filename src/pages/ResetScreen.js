import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Container, Row, Col, Image, Form } from 'react-bootstrap'
import { UserAuth } from '../context/AuthContext'

/**
 * Reset screen for users to reset their password
 */

export default function ResetScreen() {

  //functions passed to screen by context
  const { passwordReset } = UserAuth()

  //state Management
  const [formData, setformData] = useState({
    email: "",
  })
  const [error, setError] = useState('')
  const [sent, setSent] = useState(false)

  /**
   * Function to perform password reset using method passed through AuthContext Provider
   * @param {event} e Object describing the event that occurred
   */
  function resetPassword(e) {
    setSent(false)
    e.preventDefault();
    passwordReset(formData.email)
      .then(() => {
        setError('')
        setSent(true)
      })
      .catch((error) => {
        setError(error.message)
      });
  }

  /**
   * Function to handle state changes to password reset form
   * @param {event} event Object describing the event that occurred
   */
  function handleChange(event) {
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
        <Row md={3} sm={1} xs={2} className='d-flex justify-content-center mb-4 mt-4'>
          <Image src={require("../images/logo.png")} alt="missing" />
        </Row>
        <Row className='d-flex justify-content-center'>
          <Col xs={10} sm={1} md={6}>
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
              {sent ?
                <Form.Text className="text-success">
                  Reset Email sent, please check your inbox!
                </Form.Text>
                :
                <Button style={{ width: '100%' }} variant="primary" type="submit">
                  Reset Password
                </Button>}
            </Form>
          </Col>
        </Row>
        <Row className='justify-content-center'>
          <Col  xs={5} sm={1} md={4}>
            <h6 className='text-center login-options mt-4'>No registered Email? <Link to='/signup'>Signup</Link></h6>
          </Col>
          <Col  xs={5} sm={1} md={4}>
            <h6 className='text-center login-options mt-4'>Already Signed up? <Link to='/'>Login</Link></h6>
          </Col>
        </Row>
      </Container>
    </div >

  )
}
