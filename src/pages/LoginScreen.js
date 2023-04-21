import React, { useState } from "react"
import { Button, Container, Row, Col, Form, Image } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import { UserAuth } from "../context/AuthContext"
import packageJson from "../../package.json"

export default function LoginScreen() {

  //useNavigate hook from react router DOM
  const navigate = useNavigate()
  //functions passed to screen by context
  const { signIn } = UserAuth()
  //state
  const [formData, setformData] = useState({
    email: "",
    password: "",
  })
  const [error, setError] = useState('')


  function handleChange(event) {
    const { name, value } = event.target
    setformData(prevState => {
      return {
        ...prevState, [name]: value
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
        <Row md={2} sm={1} className='justify-content-center'>
          <h1 className='mb-10 text-center login-title '>The Rapid HIV & Syphilis Testing Management Portal</h1>
        </Row>
        <Row className=' justify-content-center' xs={2} sm={1} md={1}>
          <h5 className='text-center'>Version {packageJson.version}</h5>
        </Row>
        <Row md={3} sm={1} xs={2} className='d-flex justify-content-center mb-2 mt-4'>
          <Image src={require("../images/logo.png")} alt="missing" />
        </Row>
        <Row className='d-flex justify-content-center'>
          <Col xs={10} sm={1} md={6} >
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
              <Form.Text className="text-danger">
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
        <Row className='text-center justify-content-center mt-4'>
          <Col xs={4} sm={1} md={2}>
            <h5 className='text-center login-options'>No login details? <Link to='/signup'>Signup</Link></h5>
          </Col >
          <Col xs={4} sm={1} md={2}>
            <h5 className='text-center login-options'><Link to='/privacy-policy-web'>View our Privacy Policy</Link></h5>
          </Col>
          <Col xs={4} sm={1} md={2}>
            <h5 className='text-center login-options'>Forgot Password? <Link to='/reset'>Reset</Link></h5>
          </Col>
        </Row>
      </Container>
    </div>
  )
}
