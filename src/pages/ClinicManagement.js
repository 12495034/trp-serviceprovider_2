import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import { Row, Col, Accordion, Form, Button, Stack } from 'react-bootstrap'
import Footer from '../components/Footer'
import ClinicCard from '../components/ClinicCard'
import NavBarTRP from '../components/NavBarTRP';
import ToolBar from '../components/ClinicToolBar';
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { firestore } from '../Firebase'
import useCollection from '../CustomHooks/UseCollection';
import useCollectionSnapshot from '../CustomHooks/UseCollectionSnapshotQuery';
import { appointInc } from '../Constants/Constants';
import { createSlotsList } from '../Functions/SpecialFunctions/createSlotsList';
import { UserAuth } from '../context/AuthContext';
import { createDateString } from '../Functions/GeneralFunctions/createDateString';
import { currentDate } from '../Functions/GeneralFunctions/currentDate';

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
    timeStamp: Timestamp.fromDate(new Date()),
  })
  const [filterRadio, setFilterRadio] = useState("Active")
  const [errorMessage, setErrorMessage] = useState('')
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

  function handleClinicDetail(clinicId) {
    navigate(`${clinicId}`);
  }

  //function that submits form data to firestore collection
  async function handleSubmit(event) {
    event.preventDefault()
    //add current user to clinic data to record the creator
    const clinicData = {}
    Object.assign(clinicData, ClinicFormData, { createdBy: user.displayName })
    //create clinic document that stores high level clinic information
    await addDoc(collection(firestore, "Clinics"), clinicData)
      .then(() => {
        setMessage("A New Clinic has been created")
      })
      .catch((e) => {
        setErrorMessage(e.message)
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

  //render list of locations (cities) that tests take place in
  const locations = locationData.map((item) => {
    return (
      <option key={item.id} value={item.id}>{item.id}</option>
    )
  })

  //render list of centers available in the selected city
  const centers = centerData.map((item) => {
    return (
      <option key={item.id} value={item.name}>{item.name}</option>
    )
  })

  //----------------------------------------------------------------------------------------
  // Page content
  //----------------------------------------------------------------------------------------

  return (
    <div className='page-body'>
      <NavBarTRP />
      <Container className='page-content'>
        <h1 className="Title">Clinic Management  {locationError ? <code>{locationError}</code> : null}</h1>
        <Accordion>
          <Accordion.Item eventKey="0">
            <Accordion.Header>Create New Clinic</Accordion.Header>
            <Accordion.Body>
              <Form onSubmit={handleSubmit} className="mt-3 background">
                <Row>
                  <Form.Group className="mb-3" as={Col} controlId="formGridState">
                    <Form.Label>Location</Form.Label>
                    <Form.Control
                      required
                      disabled={role !== "Admin" ? true : false}
                      as="select"
                      name="location"
                      onChange={handleChange}
                      value={ClinicFormData.location}
                    >
                      {/* <option value="">Choose Location</option> */}
                      {locations}
                    </Form.Control>
                  </Form.Group>
                  <Form.Group className="mb-3" as={Col} controlId="formGridState">
                    <Form.Label>Center</Form.Label>
                    <Form.Control
                      required
                      disabled={role !== "Admin" ? true : false}
                      as="select"
                      name="center"
                      placeholder='Choose Location'
                      onChange={handleChange}
                      value={ClinicFormData.center}
                    >
                      <option value="">Choose Center</option>
                      {centers}
                    </Form.Control>
                  </Form.Group>
                </Row>

                <Row className="mb-3">
                  <Form.Group as={Col} controlId="formGridCity">
                    <Form.Label>Date</Form.Label>
                    <Form.Control
                      required
                      disabled={role !== "Admin" ? true : false}
                      name="date"
                      placeholder="Choose a Date"
                      type="date"
                      min={currentDate()}
                      onChange={handleChange}
                      value={ClinicFormData.date} />
                  </Form.Group>

                  <Form.Group as={Col} controlId="formGridZip">
                    <Form.Label>Start Time</Form.Label>
                    <Form.Control
                      required
                      disabled={role !== "Admin" ? true : false}
                      name="startTime"
                      type="time"
                      placeholder="Enter time"
                      onChange={handleChange}
                      value={ClinicFormData.startTime} />
                  </Form.Group>

                  <Form.Group as={Col} controlId="formGridZip">
                    <Form.Label>Capacity (Max 8) </Form.Label>
                    <Form.Control
                      required
                      //added to prevent error caused by adding capacity before time
                      disabled={ClinicFormData.startTime !== "" ? false : true}
                      name="capacity"
                      type="number"
                      max={8}
                      min={1}
                      placeholder="Enter clinic capacity"
                      onChange={handleChange}
                      value={ClinicFormData.capacity} />
                  </Form.Group>
                </Row>
                <div className='d-grid'>
                  <Button variant="primary" type="submit">
                    Create Clinic
                  </Button>
                </div>

              </Form>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>

        <Row>
          <Stack><ToolBar radioState={filterRadio} setRadioState={setFilterRadio} /><h4><code>{message}</code></h4></Stack>
          <hr />
        </Row>
        <Row>
          <Col >
            {clinicData.length > 0 ? clinicCards : <h4>There are no clinics that match the selected criteria</h4>}
            {errorMessage ? <h4><code>{errorMessage}</code></h4> : null}
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  )
}
