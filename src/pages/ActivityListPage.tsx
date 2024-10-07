import { ReactElement } from "react";
import { IActivity } from "../utils";
import { ActivityCard } from "../components/ActivityCard";

interface IActivityProps {
    activityList : IActivity[];
    message : string;
}

export function ActivityListPage({ activityList, message } : IActivityProps) : ReactElement { 

    return(
        <span className="list-section">
          <p></p>
            {activityList && activityList.length > 0 ? (
              activityList.map((act) => (
                <ActivityCard activity={act} />
              ))
          ) : 
          (
            <p>{message}</p>
          )}
        </span>
    );
}
