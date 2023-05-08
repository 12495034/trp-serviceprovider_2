import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import { Row, Accordion, Stack } from 'react-bootstrap'
import Footer from '../components/Footer'
import ClinicCard from '../components/ClinicCard'
import NavBarTRP from '../components/NavBarTRP';
import ClinicToolBar from '../components/ClinicToolBar';
import { UserAuth } from '../context/AuthContext';
import { createDateString } from '../Functions/GeneralFunctions/createDateString';
import NewClinicForm from '../components/NewClinicForm';
import SpinnerIcon from '../components/SpinnerIcon';
import useCollectionSnapshotQuery from '../customHooks/UseCollectionSnapshotQuery';


/**
 * Web Page providing an overview of clinics created and the ability to schedule new clinics 
 */

export default function ClinicManagement() {

  //User object and role passed through AuthContext Provider
  const { user, role } = UserAuth();
  const navigate = useNavigate()

  //-----------------------------------------------------------------------------------------
  //define state
  //-----------------------------------------------------------------------------------------
  const [filterRadio, setFilterRadio] = useState("Active")
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
  //sort clinics by date prior to rendering, next clinic at the top
  clinicData.sort((p1, p2) => (p1.date < p2.date) ? -1 : (p1.date > p2.date) ? 1 : 0)
  //create Cards object that can be listed on the screen
  const clinicCards = clinicData.map((item) => {
    const availableSlots = Object.keys(item.slots).length
    const appointments = item.capacity - availableSlots
    return (
      <ClinicCard
        key={item.id} clinicId={item.id}
        location={item.location} center={item.center}
        addDetails={item.addDetails} date={createDateString(item.date)}
        capacity={item.capacity} time={item.startTime}
        appointments={appointments} status={appointments === item.capacity ? "Full" : "Space Available"}
        handleClinicDetail={handleClinicDetail}
      />)
  })
  return (
    <div className='page-body'>
      <NavBarTRP />
      <Container className='page-content'>
        <Row>
          <h1 className='page-title'>Clinic Management</h1>
        </Row>
        <Row>
          <Accordion>
            <Accordion.Item eventKey="0">
              <Accordion.Header>Create New Clinic</Accordion.Header>
              <Accordion.Body>
                {/* Render the new clinic form */}
                <NewClinicForm
                  user={user} role={role}
                />
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Row>
        <Row className='p-2'>
          <Stack><ClinicToolBar radioState={filterRadio} setRadioState={setFilterRadio} /></Stack>
          <hr />
        </Row>
        <Row xs={12} sm={12} md={12} className="p-3 justify-content-center">
          {clinicDataLoading ? <SpinnerIcon /> : clinicCards}
          {clinicDataError ? <h4>{clinicDataError}</h4> : null}
        </Row>
      </Container>
      <Footer />
    </div>
  )
}
