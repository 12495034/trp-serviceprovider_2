import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { collection, addDoc } from "firebase/firestore";
import { firestore } from '../Firebase'

export default function NewClinicForm() {

    //TODO: state initialised as 3 empty slots. But this needs to be initialised depending on what capacity the clinic can hold
    //TODO: Add validation to clinic creation form
    const [ClinicFormData, setClinicFormData] = useState({
        location: "",
        center: "",
        date: "",
        time: "",
        capacity: "",
        slots: {
            1: "1800",
            2: "1830",
        }
    })

    const [submitted, setSubmitted] = useState(false)
    //create reference to collection
    const ref = collection(firestore, "Clinics")

    //function that submits form data to firestore collection
    async function handleSubmit(event) {
        event.preventDefault()
        try {
            await addDoc(ref, ClinicFormData)
            setSubmitted(true)
        } catch (e) {
            //TODO: Test that if the document cannot be added that this error is logged to the console
            console.log(e)
        }
    }

    //function that updates state as the form fields are compiled
    function handleChange(event) {

        setClinicFormData(prevFormData => {
            return {
                ...prevFormData,
                [event.target.name]: event.target.value
            }
        })
    }

    //TODO:find a way to generate an object that can be initialised in state when the number of appointments is selected
    function blankAppointmentList() {
        const array = {}
        for (var i = 0; i < ClinicFormData.capacity; i++) {
            //let appointmentString = `slot ${i}:{time:'',userid:'',},`
            Object.assign(array, { key1: "Slot1", key2: "Slot2" })
        }
        return array
    }

    return (
        <Form onSubmit={handleSubmit} className="mt-3 background">
            <Row>
                <Form.Group className="mb-3" as={Col} controlId="formGridState">
                    <Form.Label>Location</Form.Label>
                    <Form.Control
                        as="select"
                        name="location"
                        onChange={handleChange}
                        value={ClinicFormData.location}
                    >
                        <option value="Choose location">Choose Location</option>
                        <option value="Belfast">Belfast</option>
                        <option value="Derry">Derry</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group className="mb-3" as={Col} controlId="formGridState">
                    <Form.Label>Center</Form.Label>
                    <Form.Control
                        as="select"
                        name="center"
                        onChange={handleChange}
                        value={ClinicFormData.center}
                    >
                        <option value="Choose location">Choose Location</option>
                        <option value="LGBT Center">LGBT Center</option>
                        <option value="Trans Resource Center">Trans Resource Center</option>
                    </Form.Control>
                </Form.Group>
            </Row>

            <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridCity">
                    <Form.Label>Date</Form.Label>
                    <Form.Control
                        name="date"
                        type="date"
                        placeholder="Enter date"
                        onChange={handleChange}
                        value={ClinicFormData.date} />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridZip">
                    <Form.Label>Time</Form.Label>
                    <Form.Control
                        name="time"
                        type="time"
                        placeholder="Enter time"
                        onChange={handleChange}
                        value={ClinicFormData.time} />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridZip">
                    <Form.Label>Capacity</Form.Label>
                    <Form.Control
                        name="capacity"
                        type="ticker"
                        max={8}
                        min={0}
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
    )
}
