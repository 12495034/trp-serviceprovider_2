import React from 'react'
import { Modal, Button } from 'react-bootstrap'

/**
 * Modal Confirmation Component, used to display a message to the user prior to performing an action
 */

export default function ModalConfirmation(props) {
  return (
     <Modal show={props.show} onHide={props.close}>
         <Modal.Header closeButton>
             <Modal.Title>{props.header}</Modal.Title>
         </Modal.Header>
         <Modal.Body>{props.body}</Modal.Body>
         <Modal.Footer>
             <Button variant="primary" onClick={props.updatefunction}>
                 Confirm
             </Button>
             <Button variant="secondary" onClick={props.close}>
                 Cancel
             </Button>
         </Modal.Footer>
     </Modal>

  )
}
