import React, { ReactElement } from "react";
import { Modal, Button } from "react-bootstrap";
import { AddUserForm } from "../pages/render/RenderAddUserForm.tsx";

interface ModalPopupProps {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

export function ModalPopupCreateUser({ show, setShow }: ModalPopupProps): ReactElement {

  const handleCloseModal = () => {
    setShow(false);
    window.location.reload();
  };

  return (
      <Modal show={show} onHide={handleCloseModal} backdrop={false}>
        <Modal.Header closeButton>
          <Modal.Title>Add a New Course</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddUserForm />
        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>
  );
}
