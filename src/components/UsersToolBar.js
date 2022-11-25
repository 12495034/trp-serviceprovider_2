import React from 'react'
import { Form, Row, Col, } from 'react-bootstrap'

export default function UsersToolBar() {
    return (
        <Form>
            <Row>
                <Form.Group className="mt-3 mb-3" as={Col} controlId="formGridState">
                    <Form.Label>User Status</Form.Label>
                    <Form.Control
                        as="select"
                        name="location"
                    >
                        <option value="">Choose Status</option>
                        <option value="Active">Active</option>
                        <option value="Suspended">Suspended</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group className="mt-3 mb-3" as={Col} controlId="formGridState">
                    <Form.Label>User Role</Form.Label>
                    <Form.Control
                        as="select"
                        name="location"
                    >
                        <option value="">Choose Role</option>
                        <option value="Admin">Admin</option>
                        <option value="Service User">Service User</option>
                    </Form.Control>
                </Form.Group>
            </Row>
        </Form>
    )
}
