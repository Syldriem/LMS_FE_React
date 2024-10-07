import { ReactElement } from "react";
import "../css/ActivityCard.css";
import { IActivity } from "../utils";

interface IActivityProps {
    activity: IActivity | null;
}

export function ActivityCard({ activity }: IActivityProps): ReactElement {
    if (!activity) {
        return <p>Activity data is unavailable.</p>; 
    }

    const formattedStartDate = new Date(activity.start).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });

      
    const formattedEndDate = new Date(activity.end).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });

    return (
        
        <span className="card-base">
            <p className="title-card-src-a">{activity.name}</p>
            <div className="desc">
                <p className="cat-lbl-a">Description:</p>
                <p className="spec-lbl">{activity.description}</p>
            </div>
            <div className="desc">
                <p className="cat-lbl-a">Start Date:</p>
                <p className="spec-lbl">{formattedStartDate}</p>
            </div>
            <div className="desc">
                <p className="cat-lbl-a">End Date:</p>
                <p className="spec-lbl">{formattedEndDate}</p>
            </div>
        </span>
    );
}
