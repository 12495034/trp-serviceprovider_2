import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import { Row, Col, Accordion, Stack } from 'react-bootstrap'
import Footer from '../components/Footer'
import ClinicCard from '../components/ClinicCard'
import NavBarTRP from '../components/NavBarTRP';
import ClinicToolBar from '../components/ClinicToolBar';
import { Timestamp } from "firebase/firestore";
import useCollectionSnapshot from '../CustomHooks/UseCollectionSnapshotQuery';
import { appointInc } from '../Constants/Constants';
import { createSlotsList } from '../Functions/SpecialFunctions/createSlotsList';
import { UserAuth } from '../context/AuthContext';
import { createDateString } from '../Functions/GeneralFunctions/createDateString';
import { currentDate } from '../Functions/GeneralFunctions/currentDate';
import NewClinicForm from '../components/NewClinicForm';
import { firestoreAddDoc } from '../FirestoreFunctions/firestoreWrite';
import useCollection from '../CustomHooks/UseCollection';

export default function ClinicManagement() {
  //functions or state provided to screen by context
  const { user, role } = UserAuth();
  const navigate = useNavigate()

  //define state
  //-----------------------------------------------------------------------------------------
  const [ClinicFormData, setClinicFormData] = useState({
    //default location set to belfast to avoid error being thrown due to undefined location
    location: "Belfast",
    center: "",
    date: "",
    startTime: "",
    capacity: 0,
    slots: {},
    clinicStatus: "Active",
    addDetails: "",
    timeStamp: Timestamp.fromDate(new Date()),
  })
  const [filterRadio, setFilterRadio] = useState("Active")
  const [message, setMessage] = useState('')

  //custom hookes for standard data retrieval
  //Create clinic dropdown menu data
  const { collectionData: locationData, isCollectionLoading: locationLoading, collectionError: locationError } = useCollection('Location', null)
  const { collectionData: centerData, isCollectionLoading: centerLoading, collectionError: centerError } = useCollection(`Location/${ClinicFormData.location}/Centers`, ClinicFormData.location)
  //retrieve clinic data based on radio button selection
  const { collectionData: clinicData, isCollectionLoading: clinicDataLoading, collectionError: clinicDataError } = useCollectionSnapshot('Clinics', 'clinicStatus', filterRadio)

  //----------------------------------------------------------------------------------------
  // Functions
  //----------------------------------------------------------------------------------------

  //When a user clicks on the
  function handleClinicDetail(clinicId) {
    navigate(`${clinicId}`);
  }

  //function that submits form data to firestore collection
  async function handleSubmit(event) {
    event.preventDefault()
    //add current user to clinic data to record the creator
    const clinicData = {}
    Object.assign(clinicData, ClinicFormData, { createdBy: user.displayName })
    //create clinic document that stores high level clinic information, includes call back to set success/error message
    firestoreAddDoc("Clinics", clinicData)
      .then(() => {
        setMessage(`A New Clinic has been created at ${clinicData.location},${clinicData.center},${clinicData.date}, ${clinicData.startTime}`)
      })
      .catch((e) => {
        setMessage(e.message)
      })
    //clear form following clinic creation
    setClinicFormData({
      location: "Belfast",
      center: "",
      date: "",
      startTime: "",
      capacity: 0,
      slots: {},
      clinicStatus: "Active",
      addDetails: "",
    })
  }

  //function that updates state as the form fields are compiled
  function handleChange(event) {
    //clear message when creating a new clinic
    setMessage(null)
    //when the capacity is set the state needs to add or remove as required
    setClinicFormData(prevFormData => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value
      }
    })
    //resets capacity to 0 if time is altered after capacity, which is outside the valid data range.
    //prevents slots data map from becoming out of sync with start time and capacity
    if (event.target.name == "startTime") {
      setClinicFormData(prevFormData => {
        return {
          ...prevFormData,
          capacity: 0
        }
      })
    }
    //creates slots map based on start time and capacity
    if (event.target.name === "capacity") {
      const slots = createSlotsList(ClinicFormData.date, ClinicFormData.startTime, event.target.value, appointInc)
      setClinicFormData(prevFormData => {
        return {
          ...prevFormData,
          slots: slots
        }
      })
    }
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
        <h1 className="Title">Clinic Management</h1>
        <Accordion>
          <Accordion.Item eventKey="0">
            <Accordion.Header>Create New Clinic</Accordion.Header>
            <Accordion.Body>
              <NewClinicForm
                locationData = {locationData}
                centerData = {centerData}
                currentFormState={ClinicFormData}
                onChange={handleChange}
                currentDate={currentDate()}
                role={role}
                handleSubmit={handleSubmit}
              />
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>

        <Row>
          <Stack><ClinicToolBar radioState={filterRadio} setRadioState={setFilterRadio} /><h4><code>{message ? message : null}</code></h4></Stack>
          <hr />
        </Row>
        <Row>
          <Col >
            {clinicData.length > 0 ? clinicCards : <h4>There are no clinics that match the selected criteria</h4>}
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  )
}
