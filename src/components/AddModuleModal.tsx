import { ReactElement, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { AddModuleForm } from "../pages/render/RenderAddModulesForm";
import '../css/RenderCourseDetails.css'


  export function AddModuleModal(): ReactElement {
    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false); 
        window.location.reload(); 
      };
    const handleShow = () => setShow(true);
    return <>
    <Button  className="mb-4" variant="primary" onClick={handleShow} >
        Add Module
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Module</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddModuleForm></AddModuleForm>
        </Modal.Body>
        <Modal.Footer>

        </Modal.Footer>
      </Modal>
    
    </>
}