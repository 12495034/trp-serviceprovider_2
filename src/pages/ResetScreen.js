import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Button, Container, Row, Col, Image } from 'react-bootstrap'


export default function ResetScreen() {

  //const navigate = useNavigate()
  //const { reset } = UserAuth()
  const [formData, setformData] = useState({
    email: "",
  })
  //const [error, setError] = useState('')

  function handleSubmit() {
    console.log("Reset function needs to be written")
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
            <form className="form" onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Email address"
                className="form--input"
                name="email"
                onChange={handleChange}
              />
              {/* TODO:want a block button here but classes are not working */}
              <div className='reset-button'>
                <Button variant="primary" type="submit">
                  Reset Password
                </Button>
              </div>
            </form>
            <h5 md={1} className='text-center login-options mt-4'>No registered Email? <Link to='/signup'>Signup</Link></h5>
          </Col>
        </Row>
      </Container>
    </div >

  )
}
