import { ReactElement, useState } from "react";
import { Button, Modal } from "react-bootstrap";

export function AddModuleButton(): ReactElement {
    const [show, setShow] = useState(false);

    // Handlers to open and close the modal
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return <>
          <Button variant="primary" onClick={handleShow}>
        Add Module
      </Button>

      {/* Bootstrap Modal */}
      <Modal show={show} onHide={handleClose} backdrop={false}>
        <Modal.Header closeButton>
          <Modal.Title>Add Module</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          This is the content inside the modal!
        </Modal.Body>
        <Modal.Footer>

        </Modal.Footer>
      </Modal>
    
    </>
}