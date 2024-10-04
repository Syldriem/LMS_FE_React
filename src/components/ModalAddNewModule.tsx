import { ReactElement, useState } from "react";
import { Modal } from "react-bootstrap";
import { AddModuleForm } from "../pages/render/RenderAddModulesForm";

export function ModalAddNewModule(): ReactElement {
    const [show, setShow] = useState(false);

    const handleClose = () => {
        setShow(false); 
        window.location.reload(); 
      };
    return <>
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