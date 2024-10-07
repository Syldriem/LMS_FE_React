

import { ReactElement, useContext, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { ApiDataContext } from "../../context/ApiDataProvider";
import { IActivity } from "../../utils";



interface RenderAddActivitiesFormProps  {
  show: boolean;
  handleClose: () => void;
  handleSubmit: (moduleID: string) => Promise<void>;
  moduleID: string;
}

export function RenderAddActivitiesForm({ show, handleClose, handleSubmit, moduleID }: RenderAddActivitiesFormProps ): ReactElement {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [activityType, setActivityType] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  const { createActivity, fetchActivities } = useContext(ApiDataContext);

  const handleFormSubmit = async () => {
    const activityDetails = {
      name,
      description,
      activityType,
      start,
      end,
      moduleID,
    };
    try {

      await createActivity(activityDetails);  
      handleSubmit(moduleID); 
      handleClose();


    } catch (error) {
      console.error("Error creating activity:", error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>Fill Out the Form</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formField1">
            <Form.Label>Activity Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter activity name"
              value={name}
              onChange={(e) => setName(e.target.value)} // Capture input value
            />
          </Form.Group>

          <Form.Group controlId="formField2">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>


          <Form.Group controlId="formField4">
            <Form.Label>Start Date</Form.Label>
            <Form.Control
              type="date"
              value={start}
              onChange={(e) => setStart(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formField5">
            <Form.Label>End Date</Form.Label>
            <Form.Control
              type="date"
              value={end}
              onChange={(e) => setEnd(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleFormSubmit}>
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
