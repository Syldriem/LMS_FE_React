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
  
  const { fetchActivities,activities,user,deleteModule } = useContext(ApiDataContext);
  const [activitiesList, setActivityList] = useState<IActivity[]>([]); 

  const [showModal, setShowModal] = useState(false);

  const [showFormModal, setShowFormModal] = useState(false);

  const formatDate = (dateString: string | undefined): string => {
    if (!dateString) return ''; // Return an empty string if the date is undefined
    return new Date(dateString).toLocaleDateString('se-SE', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    });
  };

  
  const onActivityBtnClick = async (moduleID : string) => {
    await fetchActivities(moduleID);
    setActivityList(activities || []);
    setShowModal(true);
  }

  const handleRemoveModule = async (moduleID : string) => {
    await deleteModule(moduleID);
    window.location.reload();
  }
  const handleCloseFormModal = async () => {
    await fetchActivities(module!.id);
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
      <div className="card-src">
      <p className="title-card-src">{module?.name}</p>
      <div className="desc">
        <p className="cat-lbl">Description:</p>
        <p className="spec-lbl">{module?.description}</p>
      </div>
      <div className="desc">
        <p className="cat-lbl">Start Date:</p>
        <p className="spec-lbl">{formatDate(module?.start)}</p>
      </div>
      <div className="desc">
        <p className="cat-lbl">End Date:</p>
        <p className="spec-lbl">{formatDate(module?.end)}</p>
      </div>
      <div className="btn-container">
        <button className="btn-layout" onClick={() => onActivityBtnClick(module?.id!)}>
          Activities
        </button>
        <button className="btn-layout" onClick={() => handleRemoveModule(module?.id!)}>
          Delete
        </button>
        <button className="btn-layout" hidden>
          Documents
        </button>
      </div>
    </div>
      <Modal show={showModal} onHide={onCloseBtnClick} backdrop={false}>
        <Modal.Header closeButton>
          <Modal.Title>Module Activities</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ActivityListPage activityList={activitiesList} message="No activities connected to the module" />
          {user?.role === 'teacher' && (
          <Button variant="primary" onClick={handleOpenFormModal}>
            Add Activity
          </Button>
      )}
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


