import React from 'react'
import Form from 'react-bootstrap/Form';

export default function ToolBar(props) {
  function handleChangeRadio(e){
    props.setRadioState(e.target.value)
  }

  //Not possible to filter on multiple fields in firestore
  //full/space check boxes removed
  function handleFullCheck(){
    props.setCheckState((prev)=>{
      return{
        ...prev, full:!prev.full
      }
    })
  }

  function handleSpaceCheck(){
    props.setCheckState((prev)=>{
      return{
        ...prev, space:!prev.space
      }
    })
  }

  return (
    <Form  className=" mb-3 mt-3 pt-3">
        <div>
        {/* <Form.Check
            inline
            label="Full"
            name="full"
            type="checkbox"
            checked={props.checkState.full}
            onChange={handleFullCheck}
          />
        <Form.Check
            inline
            label="Space Available"
            name="space"
            type="checkbox"
            checked={props.checkState.space}
            onChange={handleSpaceCheck}
          /> */}
        </div>
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
