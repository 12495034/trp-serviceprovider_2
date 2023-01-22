import React, { useEffect, useState } from 'react'
import { Button, Container, Row, Col } from 'react-bootstrap'

import { useNavigate, useParams } from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import { ListGroup } from 'react-bootstrap'

import NavBarTRP from '../components/NavBarTRP'
import Footer from '../components/Footer'
import AppointmentHistoryCard from '../components/AppointmentHistoryCard'
import { UserAuth } from '../context/AuthContext'

import { getDoc, getDocs, doc, collection, deleteDoc } from "firebase/firestore";
import { firestore } from '../Firebase'

//TODO: Move signout from this page to the navbar as you should be able to signout from whatever screen you are on
export default function UserProfileData() {

  const { user, logOut } = UserAuth();

  //Define State
  const [userData, setUserData] = useState({})
  const [userAppointmentHistory, setUserAppointmentHistory] = useState([])

  //retrieve userid from URL parameter
  const { userid } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    fetchUser(userid)
    fetchUserAppointmentHistory()
  }, [user])


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
    }
  }

  async function fetchUser(firestoreUserId) {
    //button has been setup to call the firestore database and get the user info if available
    //This aspect of the code is functioning correctly, manually added document and the data imported
    const docRef = doc(firestore, "Users", firestoreUserId)
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      setUserData(docSnap.data())
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  }

  async function fetchUserAppointmentHistory() {
    const docRef = collection(firestore, `Users/${userid}/Appointments`);
    const querySnapshot = await getDocs(docRef);
    let appointmentHistoryArray = []
    querySnapshot.forEach((doc) => {
      const id = { id: doc.id }
      const data = doc.data()
      const combine = Object.assign({}, id, data)
      appointmentHistoryArray.push(combine)
    })
    setUserAppointmentHistory(appointmentHistoryArray)
  }

  async function handleDeleteUser() {
    //delete Users Appointments Sub-collection is not recommended from the client side. Use a cloud function
    //delete Users document
    //await deleteDoc(doc(firestore, `Users`, `${userid}`));
    //cloud function required to delete user from authentication table
    
  }

  //-------------------------------------------------------------------------------------
  // Data rendering
  //-------------------------------------------------------------------------------------

  //create JSX elements based on stored state data
  const appointmentHistory = userAppointmentHistory.map((item, index) => {
    //for data security the name of the person is not shown but the id of the person is perhaps
    return (
      <AppointmentHistoryCard
        key={index}
        userid={userid}
        clinicid={item.id}
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
      />
    )
  })

  // const metadata = <><ListGroup.Item><strong>Created on:</strong> {user.metadata.creationTime}</ListGroup.Item>
  //   <ListGroup.Item><strong>Last Signed In: </strong>{user.metadata.lastSignInTime}</ListGroup.Item></>

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
                <ListGroup.Item><strong>Pro-Nouns:</strong> {userData.ProNouns} </ListGroup.Item>
                <ListGroup.Item><strong>First Name:</strong> {userData.FirstName} </ListGroup.Item>
                <ListGroup.Item><strong>Middle Name:</strong> {userData.MiddleName} </ListGroup.Item>
                <ListGroup.Item><strong>Last Name:</strong> {userData.LastName} </ListGroup.Item>
                <ListGroup.Item><strong>DOB:</strong> {userData.dob}</ListGroup.Item>
                <ListGroup.Item><strong>Email:</strong> {userData.Email}</ListGroup.Item>
                <ListGroup.Item><strong>Phone Number:</strong> {userData.PhoneNumber}</ListGroup.Item>
                <ListGroup.Item><strong>Role:</strong> {userData.Role}</ListGroup.Item>
                <ListGroup.Item><strong>Status:</strong> {userData.status}</ListGroup.Item>
                <ListGroup.Item><strong>Agreed to T&Cs:</strong> {userData.isAgreedTC ? "Yes" : "No"}</ListGroup.Item>
                {/* {userid === user.uid ?metadata : null} */}
              </ListGroup>
              <Card.Body className='user-card-buttons'>
                <Button variant='warning' className='user-card-button' onClick={handleEditUser}>Edit</Button>
                <Button variant='danger' className='user-card-button' onClick={handleDeleteUser}>Delete</Button>
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
