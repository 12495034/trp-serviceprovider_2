import React, { useEffect, useState } from 'react'
import { Button, Container, Row, Col } from 'react-bootstrap'

import { useParams } from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import { ListGroup } from 'react-bootstrap'
import { FaUserCheck, FaUserClock } from "react-icons/fa";

import NavBarTRP from '../components/NavBarTRP'
import Footer from '../components/Footer'
import AppointmentCard from '../components/AppointmentCard'

import {  getDoc, doc } from "firebase/firestore";
import { firestore } from '../Firebase'


//TODO: Move signout from this page to the navbar as you should be able to signout from whatever screen you are on
export default function UserProfileData() {

  //Define State
  const [userData, setUserData] = useState({})

  //retrieve userid from URL parameter
  const { userid } = useParams()

  useEffect(() => {
    fetchUser()
  }, [])

  //firebase references
  //TODO: profile is shown to be correct on the initial navigation. But if the page is refreshed the context is not updated 
  //if the source code is altered and the page re-created then it works. Is this a demo built issue? No issue present after npm run build


  async function fetchUser() {
    //button has been setup to call the firestore database and get the user info if available
    //This aspect of the code is functioning correctly, manually added document and the data imported
    console.log(userid)
    const docRef = doc(firestore, "Users", userid)
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      setUserData(docSnap.data())
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  }

  return (
    <div className='page-body'>
      <NavBarTRP />
      {/* conditional rendering to ensure user details are not shown unless a user is logged in
      will be made redundant when protected routes are introduced */}
      <Container className='page-content'>
        <Row>
          <Col>
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
                <ListGroup.Item><strong>Agreed to T&Cs:</strong> {userData.isAgreedTC?"Yes":"No"}</ListGroup.Item>
                {/* <ListGroup.Item>Created on: {user.metadata.creationTime}</ListGroup.Item>
                <ListGroup.Item>Last Signed In: {user.metadata.lastSignInTime}</ListGroup.Item> */}
              </ListGroup>
              <Card.Body className='user-card-buttons'>
                <Button variant='warning' className='user-card-button'>Edit</Button>
                <Button variant='warning' className='user-card-button'>Suspend</Button>
                <Button variant='danger' className='user-card-button'>Delete</Button>
              </Card.Body>
            </Card>
          </Col>

          {/* //TODO:Add appointment list here. Create sub-collection in Users document to test render */}
          <Col className='user-appointments'>
            <AppointmentCard slot="1" time="12:00" center="LGBT Center" icon=<FaUserClock size={25} color='red' /> />
            <AppointmentCard date='23/12/2022' location="Belfast" center="LGBT Center" icon=<FaUserCheck size={25} color='green' /> />
            <AppointmentCard date='23/12/2022' location="Belfast" center="LGBT Center" icon=<FaUserCheck size={25} color='green' /> />
            <AppointmentCard date='23/12/2022' location="Belfast" center="LGBT Center" icon=<FaUserCheck size={25} color='green' /> />
            <AppointmentCard date='23/12/2022' location="Belfast" center="LGBT Center" icon=<FaUserCheck size={25} color='green' /> />
            <AppointmentCard date='23/12/2022' location="Belfast" center="LGBT Center" icon=<FaUserClock size={25} color='red' /> />

          </Col>


        </Row>
      </Container>
      <Footer />
    </div>
  )
}

{/* <h1>User Profile</h1>
          {user && <div>
            <h5>Display Name: {user.displayName}</h5>
            <h5>Email: {user.email}</h5>
            <h5>Email Verified: {user.emailVerified}</h5>
            <h5>Phone Number: {user.phoneNumber}</h5>
            <h5>User id: {user.uid}</h5>
            <h5>isAnonymous: {user.isAnonymous}</h5>
            {/* TODO: Appears to be an issue with meta data when the page is refreshed */}
{/* <h5>Created on: {user.metadata.creationTime}</h5>
      <h5>Last Signed in: {user.metadata.lastSignInTime}</h5> */}
