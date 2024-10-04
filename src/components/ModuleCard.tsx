import { ReactElement, useRef, useState } from "react";
import "../css/ModuleCard.css";
import { IActivity, IModules } from "../utils";

import { ActivityListPage } from "../pages/ActivityListPage";



interface IModuleProps {
  module?: IModules; 
}


export function ModuleCard({ module }: IModuleProps): ReactElement {
  
  
  const [activitiesList, setActivityList] = useState<IActivity[]>([]); 
  
  const onActivityBtnClick = (moduleID : string) => {
    document.getElementById("myModal1")!.style.display = "block";
    setTimeout(() => {
      fetchActivitiesByModuleId(moduleID).then((list: IActivity[]) => {
          setActivityList(list);
          const modal = document.getElementById("myModal"); 
          modal!.style.display = "block";
          document.getElementById("myModal1")!.style.display = "none";
      }) 
    }, 2000);


  }

  const onCloseBtnClick = () => {
    const modal = document.getElementById("myModal"); 
    modal!.style.display = "none";
    setActivityList([]);
  }

  return (
    <span>
      <div id="myModal1" className="modal1">
        <div className="modal-content1">
          <div className="loader"></div>
        </div>
      </div>
      <div id="myModal" className="modal">
        <div className="modal-content">
          <div className="btn-cont">
            <button className="close" onClick={onCloseBtnClick}>&times;</button>
          </div>
          <ActivityListPage activityList={activitiesList} message="no activities connected to the module"/>
        </div>
      </div>
      <div>
          <span key={module?.id}className="card-src">
            <p className="title-card-st">{module?.name}</p>
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
              <button className="btn-layout" onClick={() => onActivityBtnClick(module!.id)}>Activities</button>
              <button className="btn-layout" hidden>Documents</button>
            </div>
          </span>
      </div>
    </span>
  );
}


async function fetchActivitiesByModuleId(moduleId:string) {
    try {
        const response = await fetch(
          "http://localhost:5058/api/activities/moduleid/" + moduleId
        );
        const lists = await response.json();
    
        return lists;
      } catch (error) {
        console.log(error);
        return;
      }
}

