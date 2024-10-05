import { ReactElement, useContext, useEffect, useState } from "react";
import "../css/ModuleCard.css";
import { IActivity, IModules } from "../utils";

import { ActivityListPage } from "../pages/ActivityListPage";
import { ApiDataContext } from "../context/ApiDataProvider";
import { Button, Modal } from "react-bootstrap";
import { RenderAddActivitiesForm } from "../pages/render/RenderAddActivitiesForm";



interface IModuleProps {
  module?: IModules; 
}

export function ModuleCard({ module }: IModuleProps): ReactElement {
  
  const { fetchActivities,activities,createActivity } = useContext(ApiDataContext);
  const [activitiesList, setActivityList] = useState<IActivity[]>([]); 

  const [showModal, setShowModal] = useState(false);

  const [showFormModal, setShowFormModal] = useState(false);
  
  const onActivityBtnClick = async (moduleID : string) => {
    await fetchActivities(moduleID);
    setActivityList(activities || []);
    setShowModal(true);
  }
  const handleCloseFormModal = () => {
    setShowFormModal(false);
    setActivityList([]);
  };

  const onCloseBtnClick = () => {
    setShowModal(false);
    setActivityList([]);
  }

  const handleOpenFormModal = () => {
    setShowFormModal(true); 
  };

  const handleSubmitForm = async (moduleID : string) => {
    await fetchActivities(moduleID);
    setActivityList(activities || []);
    setShowFormModal(false);
  };

  useEffect(() => {
    setActivityList(activities || []);
  }, [activities]);

  return (
    <span>
      {/* Module Card */}
      <div>
        <span key={module?.id} className="card-src">
          <p className="title-card-src">{module?.name}</p>
          <div className="desc">
            <p className="cat-lbl">Description:</p>
            <p className="spec-lbl">{module?.description}</p>
          </div>
          <div className="desc">
            <p className="cat-lbl">Start Date:</p>
            <p className="spec-lbl">{module?.start}</p>
          </div>
          <div className="desc">
            <p className="cat-lbl">End Date:</p>
            <p className="spec-lbl">{module?.end}</p>
          </div>
          <div className="btn-container">
            <button className="btn-layout" onClick={() => onActivityBtnClick(module!.id)}>
              Activities
            </button>
            <button className="btn-layout" hidden>
              Documents
            </button>
          </div>
        </span>
      </div>

      {/* Bootstrap Modal */}
      <Modal show={showModal} onHide={onCloseBtnClick} backdrop={false}>
        <Modal.Header closeButton>
          <Modal.Title>Module Activities</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ActivityListPage activityList={activitiesList} message="No activities connected to the module" />
          <Button variant="primary" onClick={handleOpenFormModal}>
            Add Activity
      </Button>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onCloseBtnClick}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>


      <RenderAddActivitiesForm show={showFormModal} handleClose={handleCloseFormModal} handleSubmit={handleSubmitForm} moduleID={module!.id}>

      </RenderAddActivitiesForm>
    </span>
  );
}


