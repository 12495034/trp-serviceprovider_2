import React, { useState } from 'react'
import { Row, Col, Form, Button, Container } from 'react-bootstrap'
import { currentDate } from '../Functions/GeneralFunctions/currentDate';
import { Timestamp } from "firebase/firestore";
import { appointInc } from '../constants/general';
import { createSlotsList } from '../Functions/SpecialFunctions/createSlotsList';
import { firestoreAddDoc } from '../firestoreFunctions/firestoreWrite';
import useCollection from '../customHooks/UseCollection';
import { createDateString } from '../Functions/GeneralFunctions/createDateString';
import { clinicLeadTime } from '../constants/general';

//form component for creating a new clinic
export default function NewClinicForm(props) {

    //manage form state
    const [message, setMessage] = useState("")
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

    //Custom hooks to retrieve clinic dropdown menu data
    const { collectionData: locationData, isCollectionLoading: locationLoading, collectionError: locationError } = useCollection('Location', null)
    const { collectionData: centerData, isCollectionLoading: centerLoading, collectionError: centerError } = useCollection(`Location/${ClinicFormData.location}/Centers`, ClinicFormData.location)

    //function that submits form data to firestore collection
    async function handleSubmit(event) {
        event.preventDefault()
        const clinicData = {}
        Object.assign(clinicData, ClinicFormData, { createdBy: props.user.displayName })
        firestoreAddDoc("Clinics", clinicData)
            .then(() => {
                setMessage(`A New Clinic has been created at ${clinicData.location}, ${clinicData.center}, ${createDateString(clinicData.date)}, ${clinicData.startTime}`)
            })
            .catch((e) => {
                setMessage(e.message)
            })
        setClinicFormData({
            location: "Belfast", center: "", date: "", startTime: "", capacity: 0, slots: {}, clinicStatus: "Active", addDetails: "",
        })
    }

    //function that updates state as the form fields are compiled
    function handleChange(event) {
        setMessage(null)
        setClinicFormData(prevFormData => {
            return {
                ...prevFormData,
                [event.target.name]: event.target.value
            }
        })
        //resets capacity to 0 if time is altered after capacity, which is outside the valid data range.
        //prevents slots data map from becoming out of sync with start time and capacity
        if (event.target.name === "startTime") {
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

    // if (!locationData || !centerData) {
    //     return <div>Loading...</div>
    // }

    return (
        <Form onSubmit={handleSubmit} className="mt-3">
            <Container>
                <Row>
                    <h5>{centerError}</h5>
                </Row>
                <Row md={2} sm={1} xs={1}>
                    <Form.Group data-testid='select' className="mb-3" as={Col}>
                        <Form.Label >{`Location ${locationError}`}</Form.Label>
                        <Form.Control
                            data-testid="location"
                            id='location'
                            required
                            disabled={props.role !== "Admin" ? true : false}
                            as="select"
                            name="location"
                            onChange={handleChange}
                            value={ClinicFormData.location}
                        >
                            <option>Select a location</option>
                            {locationData.map((item) => (<option key={item.id} value={item.id}>{item.id}</option>))}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group className="mb-3" as={Col}>
                        <Form.Label>{`Center ${centerError}`}</Form.Label>
                        <Form.Control
                            id='center'
                            data-testid="center"
                            required
                            disabled={props.role !== "Admin" ? true : false}
                            as="select"
                            name="center"
                            placeholder='Choose Center'
                            onChange={handleChange}
                            value={ClinicFormData.center}
                        >
                            <option value="">Choose Center</option>
                            {centerData.map((item) => (<option key={item.name} value={item.name}>{item.name}, {item.line1}, {item.postcode}</option>))}
                        </Form.Control>
                    </Form.Group>
                </Row>
                <Row>
                    <Form.Group className="mb-3">
                        <Form.Label>Additional Details</Form.Label>
                        <Form.Control
                            required
                            id='addDetails'
                            name="addDetails"
                            disabled={props.role !== "Admin" ? true : false}
                            onChange={handleChange}
                            type="text"
                            placeholder="Describe where the tests are being conducted"
                            maxLength={20}
                            value={ClinicFormData.addDetails} />
                    </Form.Group>
                </Row>

                <Row className="mb-3">
                    <Form.Group className='mb-3' as={Col}>
                        <Form.Label>Date (Min. 2 day lead time)</Form.Label>
                        <Form.Control
                            required
                            data-testid="date"
                            id='date'
                            disabled={props.role !== "Admin" ? true : false}
                            name="date"
                            placeholder="Choose a Date"
                            type="date"
                            min={currentDate(clinicLeadTime)}
                            onChange={handleChange}
                            value={ClinicFormData.date} />
                    </Form.Group>

                    <Form.Group as={Col}>
                        <Form.Label>Start Time</Form.Label>
                        <Form.Control
                            required
                            data-testid="startTime"
                            id='startTime'
                            disabled={props.role !== "Admin" ? true : false}
                            name="startTime"
                            type="time"
                            placeholder="Enter time"
                            onChange={handleChange}
                            value={ClinicFormData.startTime} />
                    </Form.Group>

                    <Form.Group as={Col}>
                        <Form.Label>Capacity (Max 8) </Form.Label>
                        <Form.Control
                            required
                            id='capacity'
                            data-testid="capacity"
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
                <Row>
                    <div className='d-grid'>
                        <Button name='create new clinic' variant="primary" type="submit">
                            Create Clinic
                        </Button>
                    </div>
                </Row>
                <Row>
                    <h5 className='mt-3 text-success'>{message}</h5>
                </Row>
            </Container>
        </Form>
    )
}


