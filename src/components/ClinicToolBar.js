import React from 'react'
import Form from 'react-bootstrap/Form';

export default function ToolBar(props) {
  function handleChangeRadio(e){
    props.setRadioState(e.target.value)
  }

  return (
    <Form  className=" mb-3 mt-3 pt-3">
        <div className="mb-3 mt-3">
          <Form.Check
            inline
            label="Active"
            name="clinicStatus"
            value="Active"
            type="radio"
            checked={props.radioState==="Active"}
            onChange={handleChangeRadio}
          />
          <Form.Check
            inline
            label="Cancelled"
            name="clinicStatus"
            value="Cancelled"
            type="radio"
            checked={props.radioState==="Cancelled"}
            onChange={handleChangeRadio}
          />
          <Form.Check
            inline
            label="Complete"
            name="clinicStatus"
            value="Complete"
            type="radio"
            checked={props.radioState==="Complete"}
            onChange={handleChangeRadio}
          />
        </div>
    </Form>
  )
}
