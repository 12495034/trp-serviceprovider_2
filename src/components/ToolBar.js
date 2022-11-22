import React from 'react'
import Form from 'react-bootstrap/Form';


export default function ToolBar() {
  return (
    <Form  className=" mb-3 mt-3 pt-3">
        <div>
        <Form.Check
            inline
            label="Full"
            name="group1"
            type="checkbox"
          />
        <Form.Check
            inline
            label="Space Available"
            name="group1"
            type="checkbox"
          />
        </div>
        <div className="mb-3 mt-3">
          <Form.Check
            inline
            label="Active Clinics"
            name="group1"
            type="radio"
          />
          <Form.Check
            inline
            label="Completed Clinics"
            name="group1"
            type="radio"
          />
          <Form.Check
            inline
            label="Cancelled Clinics"
            name="group1"
            type="radio"
          />
        </div>
    </Form>
  )
}
