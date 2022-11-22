import React, { useEffect, useState } from 'react'
import Footer from '../components/Footer'
import ClinicCard from '../components/ClinicCard'
import NavBarTRP from '../components/NavBarTRP';
import NewClinicForm from '../components/NewClinicForm';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Accordion } from 'react-bootstrap';
import ToolBar from '../components/ToolBar';
import { collection, getDocs, getDoc, addDoc } from "firebase/firestore";
import { firestore } from '../Firebase'

//TODO: Add footer
export default function ClinicManagement() {

  //define state
  //-----------------------------------------------------------------------------------------

  const [allClinics, setAllClinics] = useState([])
  const [appointments, setAppointments] = useState([])
  console.log(allClinics)
  //----------------------------------------------------------------------------------------

  //async function to fetch the clinic list and data from firestore
  async function fetchClinics() {
    const querySnapshot = await getDocs(collection(firestore, "Clinics"));
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      setAllClinics((prev) => {
        return [...prev, doc.data()]
      })
    });
  }
  

  //use effect runs once after every render or when state is updated
  useEffect(() => {
    fetchClinics()
  }, [])

  //create Cards object that can be listed on the screen
  const Cards = allClinics.map((item) => {
      console.log(item)

      return (
        <ClinicCard
          location={item.Location}
          // date={item.schedule.date}
          capacity={item.Capacity}
          // time={item.schedule.time}
          appointments={item.Slots}
        />
      )
    })
  

  return (
    <div>
      <div>
        <NavBarTRP />
      </div>
      <h1 className="Title">Clinic Management</h1>
      <Container>
        <Row>
          <Accordion>
            <Accordion.Item eventKey="0">
              <Accordion.Header>Create New Clinic</Accordion.Header>
              <Accordion.Body>
                <NewClinicForm />
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Row>
        <Row>
          <ToolBar />
        </Row>
        <Row>
          <Col >
            {allClinics.length>0 ? Cards:<h3>Use the 'Create New Clinic' Drop down to schedule a clinic</h3>}
          </Col>
        </Row>
      </Container>
    </div>
  )
}
