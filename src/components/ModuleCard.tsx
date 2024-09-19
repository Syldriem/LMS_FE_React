import { ReactElement } from "react";
import "../css/ModuleCard.css"

export function ModuleCard(): ReactElement {

    
    return (
        <span className="card-src">
            <p className="title-card-src">Module Name</p>
            <div className="desc">
                <p className="cat-lbl">Description:</p>
                <p className="spec-lbl">The Module Description</p>
            </div>
            <div className="desc">
                <p className="cat-lbl">Start Date:</p>
                <p className="spec-lbl">01-01-2001</p>
            </div>
            <div className="desc">
                <p className="cat-lbl">End Date:</p>
                <p className="spec-lbl">01-03-2001</p>
            </div>
            <div className="btn-container">
                <button className="btn-layout">Activities</button>
                <button className="btn-layout">Documents</button>
            </div>
        </span>  
    );
}