import { ReactElement } from "react";
import "../css/ModuleCard.css";
import { IModules } from "../utils";

interface IModuleProps {
  module?: IModules;
}

export function ModuleCard({ module }: IModuleProps): ReactElement {
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
          <button className="btn-layout">Activities</button>
          {/*<button className="btn-layout">Documents</button>*/}
        </div>
      </span>
    </div>
  );
}
