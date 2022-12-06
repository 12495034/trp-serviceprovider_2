import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Accordion, Form, Button } from 'react-bootstrap';

import Footer from '../components/Footer'
import ClinicCard from '../components/ClinicCard'
import NavBarTRP from '../components/NavBarTRP';
//TODO: Refactor the Create new clinic form to simplify the code for this page
//import NewClinicForm from '../components/NewClinicForm';
import ToolBar from '../components/ClinicToolBar';

import { collection, getDocs, getDoc, addDoc, query, onSnapshot, getCountFromServer, where } from "firebase/firestore";
import { firestore } from '../Firebase'
import { FaCreativeCommonsNcJp } from 'react-icons/fa';

//TODO: Add footer
export default function ClinicManagement() {

  //define state
  //-----------------------------------------------------------------------------------------
  const [allClinics, setAllClinics] = useState([])
  //TODO: state initialised as 3 empty slots. But this needs to be initialised depending on what capacity the clinic can hold
  //TODO: Add validation to clinic creation form
  const [ClinicFormData, setClinicFormData] = useState({
    location: "",
    center: "",
    date: "",
    startTime: "",
    capacity: "",
    slots: {},
    clinicStatus: "Active",
  })
  const [filterRadio, setFilterRadio] = useState("Active")
  const [filterCheck, setFilterCheck] = useState({
    full:true,
    space:true
  })
  //console.log(allClinics)
  //console.log(ClinicFormData)
  //console.log("Parent State:" + filterRadio)
  console.log(filterCheck)
  //----------------------------------------------------------------------------------------

  //firebase firestore references
  //-------------------------------------------------------------------------------------------
  //clinic collection
  const refClinics = collection(firestore, "Clinics")
  //Appointments sub-collection within a clinic document

  //----------------------------------------------------------------------------------------
  // Functions
  //----------------------------------------------------------------------------------------
  //function that submits form data to firestore collection
  async function handleSubmit(event) {
    event.preventDefault()
    try {
      //create clinic document that stores high level clinic information
      await addDoc(refClinics, ClinicFormData)
      //create sub collection called appointments, within users will create appointment docs with their userid
      //create sub-collection called queue, within users will create queue docs with their userid
      //these sub-collections will be created automatically when a user creates a new appointment or queue document within them
    } catch (e) {
      //TODO: Test that if the document cannot be added that this error is logged to the console
      console.log(e)
    }
  }

  //function that updates state as the form fields are compiled
  function handleChange(event) {
    //when the capacity is set the state needs to add or remove as required
    setClinicFormData(prevFormData => {
      return {
        ...prevFormData,
        [event.target.name]: event.target.value
      }
    })
    //create array of slots based on time, updating state each time it is changed
    //needed a seperate function to update the state as there was no input with a name. The slots are derived data based on capacity
    console.log(ClinicFormData.capacity)
    //ensure correct input field is triggering the handle slots function to run
    if (event.target.name === "capacity") {
      handleSlotsList(ClinicFormData.startTime, event.target.value, 30)
    }
  }

  //TODO: Unit test for this functionality
  //function to create a slots array of times based on the start time and number of slots selected
  function handleSlotsList(starttime, capacity, inc) {
    console.log("Running handeSlotsList function")
    let hours = parseInt(starttime.substring(0, 2))
    let mins = parseInt(starttime.substring(3, 5))

    const dt = new Date(1970, 0, 1, hours, mins);
    const rc = {};
    for (var i = 1; i <= capacity; i++) {
      // rc.push(dt.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
      // dt.setMinutes(dt.getMinutes() + inc);
      rc[i] = dt.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
      dt.setMinutes(dt.getMinutes() + inc);
    }
    console.log(rc)
    setClinicFormData(prevFormData => {
      return {
        ...prevFormData,
        slots: rc
      }
    })
  }

  //fetch clinic list using onSnapShot listener
  function fetchClinics() {
    const q = query(collection(firestore, 'Clinics'), where("clinicStatus", "==", `${filterRadio}`));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let clinicArray = []
      querySnapshot.forEach((doc) => {
        const id = { id: doc.id }
        const data = doc.data()
        const combine = Object.assign({}, id, data)
        clinicArray.push(combine)
      })
      setAllClinics(clinicArray)
    })
    return () => unsubscribe();
    //
  }

  function handleFilterRadio() {

  }

  //use effect runs once after every render or when state is updated
  useEffect(() => {
    fetchClinics()
  }, [filterRadio, filterCheck])

  //----------------------------------------------------------------------------------------
  // Data Rendering
  //----------------------------------------------------------------------------------------

  //sort clinics by date prior to rendering
  const sortedClinics = allClinics.sort(
    (p1, p2) => (p1.date > p2.date) ? 1 : (p1.date < p2.date) ? -1 : 0)

  //create Cards object that can be listed on the screen
  //TODO: need to include unique identifier as key here to stop error in console
  const Cards = allClinics.map((item) => {

    //count the number of slots still available
    //determine the number of appointments by subtracting number of slots from capacity
    const availableSlots = Object.keys(item.slots).length
    const appointments = item.capacity - availableSlots

    return (
      <ClinicCard
        key={item.id}
        location={item.location}
        center={item.center}
        date={item.date}
        capacity={item.capacity}
        time={item.time}
        appointments={appointments}
        status={appointments == item.capacity ? "Full" : "Space Available"}
        active={item.clinicStatus}
        clinicId={item.id}
      />
    )
  })

  //----------------------------------------------------------------------------------------
  // Page content
  //----------------------------------------------------------------------------------------

  return (
    <div className='page-body'>
      <NavBarTRP />
      <Container className='page-content'>
        <h1 className="Title">Clinic Management</h1>
        <Row>
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
                        as="select"
                        name="location"
                        onChange={handleChange}
                        value={ClinicFormData.location}
                      >
                        <option value="">Choose Location</option>
                        <option value="Belfast">Belfast</option>
                        <option value="Derry">Derry</option>
                      </Form.Control>
                    </Form.Group>
                    <Form.Group className="mb-3" as={Col} controlId="formGridState">
                      <Form.Label>Center</Form.Label>
                      <Form.Control
                        required
                        as="select"
                        name="center"
                        onChange={handleChange}
                        value={ClinicFormData.center}
                      >
                        <option value="">Choose Location</option>
                        <option value="LGBT Center">LGBT Center</option>
                        <option value="Trans Resource Center">Trans Resource Center</option>
                      </Form.Control>
                    </Form.Group>
                  </Row>

                  <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridCity">
                      <Form.Label>Date</Form.Label>
                      <Form.Control
                        required
                        name="date"
                        type="date"
                        placeholder="Enter date"
                        onChange={handleChange}
                        value={ClinicFormData.date} />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridZip">
                      <Form.Label>Time</Form.Label>
                      <Form.Control
                        required
                        name="startTime"
                        type="time"
                        placeholder="Enter time"
                        onChange={handleChange}
                        value={ClinicFormData.startTime} />
                    </Form.Group>

                    <Form.Group as={Col} controlId="formGridZip">
                      <Form.Label>Capacity</Form.Label>
                      <Form.Control
                        required
                        name="capacity"
                        type="number"
                        max={8}
                        min={1}
                        placeholder="Enter clinic capacity"
                        onChange={handleChange}
                        value={ClinicFormData.capacity} />
                    </Form.Group>
                  </Row>
                  {/* <Form.Group className="mb-3" id="formGridCheckbox">
                <Form.Check type="checkbox" label="Notify Users" />
            </Form.Group> */}
                  <div className='d-grid'>
                    <Button variant="primary" type="submit">
                      Create Clinic
                    </Button>
                  </div>

                </Form>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Row>
        <Row>
          <ToolBar radioState={filterRadio} setRadioState={setFilterRadio} checkState={filterCheck} setCheckState={setFilterCheck} />
          <hr />
        </Row>
        <Row>
          <Col >
            {allClinics.length > 0 ? Cards : <h3>There are no clinics that match the selected criteria</h3>}
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  )
}
