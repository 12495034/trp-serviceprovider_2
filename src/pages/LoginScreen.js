import React, { useState } from "react"
import { Button, Container, Row, Col, Form, Image } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import { UserAuth } from "../context/AuthContext"

export default function LoginScreen() {

  const navigate = useNavigate()
  const { signIn } = UserAuth()
  const [formData, setformData] = useState({
    email: "",
    password: "",
  })
  const [error, setError] = useState('')

  function handleChange(event) {
    // console.log(event.target.type)
    const { name, value, type, checked } = event.target
    setformData(prevState => {
      return {
        ...prevState, [name]: type === "checkbox" ? checked : value
      }
    })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    try {
      await signIn(formData.email, formData.password)
      navigate('/home')
    } catch (e) {
      setError(e.message)

    }
  }

  return (
    <div className='login-body'>
      <Container className='login-content'>
        <Row >
          <h1 className='text-center login-title '>The Rapid HIV & Syphilis Booking System</h1>
        </Row>
        <Row md={2} sm={1} xs={2} className='d-flex justify-content-center mb-4 mt-4'>
          <Image src={require("../images/logo.png")} alt="missing" />
        </Row>
        <Row md={2} className='d-flex justify-content-center'>
          <Col >
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  required
                  type="email"
                  placeholder="Enter email"
                  name='email'
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  required
                  type="password"
                  placeholder="Password"
                  name='password'
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Text className="text-muted">
                {error ? error : null}
              </Form.Text>
              <div className='d-grid mt-2'>
                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
        <Row md={1} className='text-center login-options mt-4'>
          <h6>No login details? <Link to='/signup'>Signup</Link></h6>
          <h6>Forgot Password? <Link to='/reset'>Reset</Link></h6>
        </Row>
      </Container>
    </div>
  )
}
