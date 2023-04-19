import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import { Row, Col, Accordion, Stack } from 'react-bootstrap'
import Footer from '../components/Footer'
import ClinicCard from '../components/ClinicCard'
import NavBarTRP from '../components/NavBarTRP';
import ClinicToolBar from '../components/ClinicToolBar';
import { UserAuth } from '../context/AuthContext';
import { createDateString } from '../Functions/GeneralFunctions/createDateString';
import NewClinicForm from '../components/NewClinicForm';
import Spinner from 'react-bootstrap/Spinner';
import useCollectionSnapshotQuery from '../customHooks/UseCollectionSnapshotQuery';
import { spinnerType } from '../constants/general';
import { spinnerColor } from '../constants/general';


export default function ClinicManagement() {

  //functions or state provided to screen by context
  const { user, role } = UserAuth();
  const navigate = useNavigate()

  //-----------------------------------------------------------------------------------------
  //define state
  //-----------------------------------------------------------------------------------------
  const [filterRadio, setFilterRadio] = useState("Active")
  const [message, setMessage] = useState('')
  //-----------------------------------------------------------------------------------------
  //Retrieve data from firestore using custom hook
  //-----------------------------------------------------------------------------------------

  //retrieve clinic data based on radio button selection
  const { collectionData: clinicData, isCollectionLoading: clinicDataLoading, collectionError: clinicDataError } = useCollectionSnapshotQuery('Clinics', 'clinicStatus', filterRadio)

  //----------------------------------------------------------------------------------------
  // Functions
  //----------------------------------------------------------------------------------------

  //When a user clicks on the
  function handleClinicDetail(clinicId) {
    navigate(`${clinicId}`);
  }

  //----------------------------------------------------------------------------------------
  // Data Rendering
  //----------------------------------------------------------------------------------------

  //sort clinics by date prior to rendering, nearest clinic at the top
  clinicData.sort(
    (p1, p2) => (p1.date < p2.date) ? -1 : (p1.date > p2.date) ? 1 : 0)

  //create Cards object that can be listed on the screen
  const clinicCards = clinicData.map((item) => {
    //slots map is maintained as appointments are booked and cancelled
    const availableSlots = Object.keys(item.slots).length
    const appointments = item.capacity - availableSlots

    return (
      <ClinicCard
        key={item.id}
        location={item.location}
        center={item.center}
        addDetails={item.addDetails}
        date={createDateString(item.date)}
        capacity={item.capacity}
        time={item.startTime}
        appointments={appointments}
        status={appointments === item.capacity ? "Full" : "Space Available"}
        clinicId={item.id}
        handleClinicDetail={handleClinicDetail}
      />
    )
  })

  //----------------------------------------------------------------------------------------
  // Page content
  //----------------------------------------------------------------------------------------

  return (
    <div className='page-body'>
      <NavBarTRP userId={user.uid} email={user.email} />
      <Container className='page-content'>
        <Row>
          <h1 className='page-title'>Clinic Management</h1>
        </Row>
        <Row>
          <Accordion>
            <Accordion.Item eventKey="0">
              <Accordion.Header>Create New Clinic</Accordion.Header>
              <Accordion.Body>
                <NewClinicForm
                  user={user}
                  role={role}
                />
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Row>
        <Row className='p-2'>
          <Stack><ClinicToolBar radioState={filterRadio} setRadioState={setFilterRadio} /><h4><code>{message ? message : null}</code></h4></Stack>
          <hr />
        </Row>
        <Row className="justify-content-md-center p-3">
          {/* <Col> */}
          {/* {clinicData.length > 0 ? clinicCards : <h4>There are no clinics that match the selected criteria</h4>} */}
          {clinicDataLoading ? <Spinner animation={spinnerType} variant={spinnerColor} /> : clinicCards}
          {clinicDataError ? <h4>{clinicDataError}</h4> : null}
          {/* </Col> */}
        </Row>
      </Container>
      <Footer />
    </div>
  )
}
