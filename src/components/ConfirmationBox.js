import React from 'react'
import { Button, Modal } from 'react-bootstrap';

export default function ConfirmationBox(props) {
    
  
    return (
      <>
        <Modal show={props.show} onHide={props.close}>
          <Modal.Header closeButton>
            <Modal.Title>{props.heading}</Modal.Title>
          </Modal.Header>
          <Modal.Body>{props.body}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={props.close}>
              Confirm
            </Button>
            <Button variant="primary" onClick={props.close}>
              Reject
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
