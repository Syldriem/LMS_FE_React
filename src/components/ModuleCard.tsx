import { ReactElement, useState } from "react";
import "../css/ModuleCard.css";
import { IModules } from "../utils";
import { useNavigate } from "react-router-dom";
import Popup from 'reactjs-popup';
import { ActivityListPage } from "../pages/ActivityListPage";

interface IModuleProps {
  module?: IModules;
}


export function ModuleCard({ module }: IModuleProps): ReactElement {
  
  
  const onActivityBtnClick = (moduleID : string) => {

    console.log("here the module id is:", moduleID);
    let width = (screen.width - 800) / 2;
    var dis = `status=no, width=600, height=600, left=${width}, top=0`
    window.open(`/activitylist/${moduleID}`, 'modulelist', dis);
  }


  return (
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
          {/*<button className="btn-layout">Activities</button>*/}
          {/*<button className="btn-layout">Documents</button>*/}
        </div>
        <div className="btn-container">
            <button className="btn-layout" onClick={() => onActivityBtnClick(module!.id)}>Activities</button>
            <button className="btn-layout">Documents</button>
          </div>
      </span>
    </div>
  );
}
