import React from 'react'
import { Button, Container, Row, Col } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import { ListGroup } from 'react-bootstrap'
import NavBarTRP from '../components/NavBarTRP'
import Footer from '../components/Footer'
import AppointmentHistoryCard from '../components/AppointmentHistoryCard'
import { UserAuth } from '../context/AuthContext'
import useDoc from '../CustomHooks/UseDoc'
import useCollection from '../CustomHooks/UseCollection'

export default function UserProfileData() {
  const { user, logOut } = UserAuth();
  //retrieve userid from URL parameter
  const { userid } = useParams()
  const navigate = useNavigate()

  //custom hook for standard firestore data retrieval
  const { docData, isDocLoading, docError } = useDoc('Users', userid, null)
  const { collectionData: appointmentHistoryData, isCollectionLoading: locationLoading, collectionError: appointmentHistoryError } = useCollection(`Users/${userid}/Appointments`, null)

  function handleClinicDetail(clinicId) {
    navigate(`/clinics/${clinicId}`);
  }

  function handleEditUser() {
    navigate(`/Users/${userid}/edit`);
  }

  async function handleSignOut() {
    console.log("Sign out")
    try {
      await logOut()
      navigate('/')
    } catch (e) {
      console.log(e.message)
    }}

  //-------------------------------------------------------------------------------------
  // Data rendering
  //-------------------------------------------------------------------------------------
  //sort appointment history by date prior to rendering
  appointmentHistoryData.sort(
    (p1, p2) => (p1.date < p2.date) ? -1 : (p1.date > p2.date) ? 1 : 0)

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
      />)})

  return (
    <div className='page-body'>
      <NavBarTRP />
      {/* conditional rendering to ensure user details are not shown unless a user is logged in
      will be made redundant when protected routes are introduced */}
      <Container className='page-content'>
        <Row>
          <Col md={5}>
            <Card className='user-card'>
              {/* <Card.Img variant="top" src={require('../images/user_test.jpg')} /> */}
              <Card.Body>
                <Card.Title>User ID: {userid}</Card.Title>
                <Card.Text>
                </Card.Text>
              </Card.Body>
              <ListGroup className="list-group-flush">
                <ListGroup.Item><strong>Pro-Nouns:</strong> {docData.ProNouns} </ListGroup.Item>
                <ListGroup.Item><strong>First Name:</strong> {docData.FirstName} </ListGroup.Item>
                <ListGroup.Item><strong>Middle Name:</strong> {docData.MiddleName} </ListGroup.Item>
                <ListGroup.Item><strong>Last Name:</strong> {docData.LastName} </ListGroup.Item>
                <ListGroup.Item><strong>DOB:</strong> {docData.dob}</ListGroup.Item>
                <ListGroup.Item><strong>Email:</strong> {docData.Email}</ListGroup.Item>
                <ListGroup.Item><strong>Phone Number:</strong> {docData.PhoneNumber}</ListGroup.Item>
                <ListGroup.Item><strong>Role:</strong> {docData.Role}</ListGroup.Item>
                <ListGroup.Item><strong>Status:</strong> {docData.status}</ListGroup.Item>
                <ListGroup.Item><strong>Agreed to T&Cs:</strong> {docData.isAgreedTC ? "Yes" : "No"}</ListGroup.Item>
                {/* {userid === user.uid ?metadata : null} */}
              </ListGroup>
              <Card.Body className='user-card-buttons'>
                <Button variant='warning' className='user-card-button' onClick={handleEditUser}>Edit</Button>
                {/* <Button variant='danger' className='user-card-button' onClick={handleDeleteUser}>Delete</Button> */}
                {userid === user.uid ? <Button variant='primary' className='user-card-button' onClick={handleSignOut}>Logout</Button> : null}
              </Card.Body>
            </Card>
          </Col>
          <Col className='user-appointments'>
            {appointmentHistory}
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  )
}
