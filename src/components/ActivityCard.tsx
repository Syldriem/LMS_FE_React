import { ReactElement } from "react";
import "../css/ActivityCard.css";
import { IActivity } from "../utils";

interface IActivityProps {
    activity: IActivity
}



export function ActivityCard({ activity } : IActivityProps) : ReactElement {

    
    return (
        <span className="card-base">
            <p className="title-card-src">{activity.name}</p>
            <div className="desc">
                <p className="cat-lbl">Description:</p>
                <p className="spec-lbl">{activity.description}</p>
            </div>
            <div className="desc">
                <p className="cat-lbl">Activity Type:</p>
                <p className="spec-lbl">{activity.activityType}</p>
            </div>
            <div className="desc">
                <p className="cat-lbl">Start Date:</p>
                <p className="spec-lbl">{activity.start}</p>
            </div>
            <div className="desc">
                <p className="cat-lbl">End Date:</p>
                <p className="spec-lbl">{activity.end}</p>
            </div>
        </span>
    );
}