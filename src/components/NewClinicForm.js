
import React from 'react'
import { Row, Col, Form, Button } from 'react-bootstrap'

//form component for creating a new clinic
export default function NewClinicForm(props) {

    //render list of locations (cities) that tests take place in
    const locations = props.locationData.map((item) => {
        return (
            <option key={item.id} value={item.id}>{item.id}</option>
        )
    })

    //render list of centers available in the selected city
    const centers = props.centerData.map((item) => {
        return (
            <option key={item.id} value={item.name}>{item.name}</option>
        )
    })

    return (
        <Form onSubmit={props.handleSubmit} className="mt-3 background">
            <Row>
                <Form.Group className="mb-3" as={Col}>
                    <Form.Label>Location</Form.Label>
                    <Form.Control
                        data-testid="location"
                        id='location'
                        required
                        disabled={props.role !== "Admin" ? true : false}
                        as="select"
                        name="location"
                        onChange={props.onChange}
                        value={props.currentFormState.location}
                    >
                        {locations}
                    </Form.Control>
                </Form.Group>
                <Form.Group className="mb-3" as={Col}>
                    <Form.Label>Center</Form.Label>
                    <Form.Control
                        id='center'
                        data-testid="center"
                        required
                        disabled={props.role !== "Admin" ? true : false}
                        as="select"
                        name="center"
                        placeholder='Choose Center'
                        onChange={props.onChange}
                        value={props.currentFormState.center}
                    >
                        <option value="">Choose Center</option>
                        {centers}
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
                        onChange={props.onChange}
                        type="text"
                        placeholder="Describe where the tests are being conducted"
                        value={props.currentFormState.addDetails} />
                </Form.Group>
            </Row>

            <Row className="mb-3">
                <Form.Group as={Col}>
                    <Form.Label>Date</Form.Label>
                    <Form.Control
                        required
                        data-testid="date"
                        id='date'
                        disabled={props.role !== "Admin" ? true : false}
                        name="date"
                        placeholder="Choose a Date"
                        type="date"
                        min={props.currentDate}
                        onChange={props.onChange}
                        value={props.currentFormState.date} />
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
                        onChange={props.onChange}
                        value={props.currentFormState.startTime} />
                </Form.Group>

                <Form.Group as={Col}>
                    <Form.Label>Capacity (Max 8) </Form.Label>
                    <Form.Control
                        required
                        id='capacity'
                        data-testid="capacity"
                        disabled={props.currentFormState.startTime !== "" ? false : true}
                        name="capacity"
                        type="number"
                        max={8}
                        min={1}
                        placeholder="Enter clinic capacity"
                        onChange={props.onChange}
                        value={props.currentFormState.capacity} />
                </Form.Group>
            </Row>
            <div className='d-grid'>
                <Button name='create new clinic' variant="primary" type="submit">
                    Create Clinic
                </Button>
            </div>

        </Form>
    )
}


