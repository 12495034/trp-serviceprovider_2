import React, { useState, useEffect } from 'react'
import { Button, Container, Row, Col } from 'react-bootstrap'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import { ListGroup } from 'react-bootstrap'
import NavBarTRP from '../components/NavBarTRP'
import Footer from '../components/Footer'
import AppointmentHistoryCard from '../components/AppointmentHistoryCard'
import { UserAuth } from '../context/AuthContext'
import useDoc from '../customHooks/UseDoc'
import useCollection from '../customHooks/UseCollection'
import { convertFirestoreTimeStamp } from '../Functions/SpecialFunctions/convertFirestoreTimeStamp'

export default function UserProfileData() {
  
  const { user, logOut, passwordReset } = UserAuth();
  
  //retrieve userid from URL parameter
  const { userid } = useParams()
  const navigate = useNavigate()
  const {state} = useLocation()

  //Define State
  const [sent, setSent] = useState(true)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  //custom hook for standard firestore data retrieval
  const { docData, isDocLoading, docError } = useDoc('Users', userid, userid)
  const { docData: restrictedData, isDocLoading: restrictedDataLoading, docError: restrictedDataError } = useDoc(`Users/${userid}/Restricted`, 'Details')
  const { collectionData: appointmentHistoryData, isCollectionLoading: locationLoading, collectionError: appointmentHistoryError } = useCollection(`Users/${userid}/Appointments`, null)

  function handleClinicDetail(clinicId) {
    navigate(`/clinics/${clinicId}`);
  }

  function handleEditUser() {
    navigate(`/Users/${userid}/edit`);
  }

  function resetPassword(e) {
    e.preventDefault();
    passwordReset(docData.email)
      .then(() => {
        setSent(true)
        setMessage(`Password Rest Email sent to ${docData.email}`)
      })
      .catch((error) => {
        setError(error.message)
      });
  }

  async function handleSignOut() {
    console.log("Sign out")
    try {
      await logOut()
      navigate('/')
    } catch (e) {
      console.log(e.message)
    }
  }

 

  //-------------------------------------------------------------------------------------
  // Data rendering
  //-------------------------------------------------------------------------------------
  //sort appointment history by date prior to rendering
  appointmentHistoryData.sort(
    (p1, p2) => (p1.date > p2.date) ? -1 : (p1.date < p2.date) ? 1 : 0)

  //create JSX elements based on stored state data
  const appointmentHistory = appointmentHistoryData.map((item, index) => {
    //for data security the name of the person is not shown but the id of person is perhaps
    return (
      <AppointmentHistoryCard
        key={index}
        userid={userid}
        clinicId={item.id}
        slot={item.slot}
        date={item.date}
        time={item.time}
        location={item.location}
        center={item.center}
        checkedIn={item.checkedIn}
        wasSeen={item.wasSeen}
        called={item.called}
        clinicStatus={item.clinicStatus}
        appointmentStatus={item.status}
        handleClinicDetail={handleClinicDetail}
        addDetails={item.addDetails}
      />)
  })

  return (
    <div className='page-body'>
     <NavBarTRP userId={user.uid} email={user.email}/>
      <Container className='page-content'>
      <h1 className='page-title'>User Profile</h1>
        <Row>
          <Col md={5}>
            {docError!=""?
            <Card className='user-card'>
              {/* <Card.Img variant="top" src={require('../images/user_test.jpg')} /> */}
              <Card.Body>
                <Card.Title className="text-primary text-uppercase">{docData.email}</Card.Title>
                <Card.Text>
                <code>{docError ? docError : null}</code>
                </Card.Text>
              </Card.Body>
              <ListGroup className="list-group-flush">
                <ListGroup.Item><Row><Col><strong>Pro-Nouns:</strong></Col><Col>{docData.ProNouns} </Col></Row> </ListGroup.Item>
                <ListGroup.Item><Row><Col><strong>First Name:</strong></Col><Col> {docData.FirstName} </Col></Row> </ListGroup.Item>
                <ListGroup.Item><Row><Col><strong>Middle Name:</strong></Col><Col> {docData.MiddleName}</Col></Row> </ListGroup.Item>
                <ListGroup.Item><Row><Col><strong>Last Name:</strong></Col><Col> {docData.LastName}</Col></Row> </ListGroup.Item>
                <ListGroup.Item><Row><Col><strong>DOB:</strong></Col><Col> {docData.dob}</Col></Row></ListGroup.Item>
                <ListGroup.Item><Row><Col><strong>Phone Number:</strong></Col><Col>  {docData.PhoneNumber}</Col></Row></ListGroup.Item>
                <ListGroup.Item><Row><Col><strong>Role:</strong></Col><Col>{restrictedData.role}</Col></Row></ListGroup.Item>
                <ListGroup.Item><Row><Col><strong>Status:</strong> </Col><Col> {restrictedData.accountStatus}</Col></Row></ListGroup.Item>
                <ListGroup.Item><Row><Col><strong>Created On:</strong> </Col><Col> {convertFirestoreTimeStamp(docData.createdAt)}</Col></Row></ListGroup.Item>
                <ListGroup.Item><Row><Col><strong>Agreed to T&Cs:</strong> </Col><Col> {docData.isAgreedTC ? "Yes" : "No"}</Col></Row></ListGroup.Item>
                <ListGroup.Item><Row><Col><strong>Email Notifications enabled:</strong> </Col><Col> {docData.emailOptIn? "Yes":"No"}</Col></Row></ListGroup.Item>
              </ListGroup>
              <Card.Body className='user-card-buttons'>
                <Button variant='warning' className='user-card-button' onClick={handleEditUser}>Edit</Button>
                {userid === user.uid ? <Button variant='secondary' className='user-card-button' onClick={resetPassword}>Reset Password</Button> : null}
                {userid === user.uid ? <Button variant='primary' className='user-card-button' onClick={handleSignOut}>Logout</Button> : null}
              </Card.Body>
            </Card>
            :
            <h5><code>{docError}</code></h5>}
            <Row>
              <Col>{error ? <p className='mt-3 text-danger'>{error}</p> : null}</Col>
            </Row>
            <Row>
              <Col>{sent ? <p className='mt-3 text-success'>{message}</p> : null}</Col>
            </Row>
            <Row>
              <Col>{state ? <p className='mt-3 text-success'>{state.message}</p> : null}</Col>
            </Row>
          </Col>
          <Col className='user-appointments'>
            {appointmentHistoryError ? <h4><code> {appointmentHistoryError}</code></h4> : null}
            {appointmentHistory.length > 0 ? appointmentHistory : <h5>No appointment History found</h5>}
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  )
}
