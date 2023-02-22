import React from 'react'
import Form from 'react-bootstrap/Form';

export default function ToolBar(props) {
  return (
    <Form  className=" pb-3 pt-3">
          <Form.Check
            inline
            label="Active"
            name="clinicStatus"
            value="Active"
            type="radio"
            checked={props.radioState==="Active"}
            onChange={(e)=>props.setRadioState(e.target.value)}
          />
          <Form.Check
            inline
            label="Cancelled"
            name="clinicStatus"
            value="Cancelled"
            type="radio"
            checked={props.radioState==="Cancelled"}
            onChange={(e)=>props.setRadioState(e.target.value)}
          />
          <Form.Check
            inline
            label="Complete"
            name="clinicStatus"
            value="Complete"
            type="radio"
            checked={props.radioState==="Complete"}
            onChange={(e)=>props.setRadioState(e.target.value)}
          />
    </Form>
  )
}
