import { ReactElement, useEffect, useState } from "react";
import { IActivity } from "../utils";
import { ActivityCard } from "../components/ActivityCard";

interface IActivityProps {
    activityList : IActivity[];
    message : string;
}

export function ActivityListPage({ activityList, message } : IActivityProps) : ReactElement { 

    const [mess, setMess] = useState<string>(message);

    useEffect(() => {
      if (activityList.length == 0){
        setMess("no activities planned for this module")
      } else {
        setMess(message);
      }
    }, []);

    return(
        <>
            <p className="sub-tit"></p>
            {activityList && activityList.length > 0 ? (
              activityList.map((act) => (
                <ActivityCard key={act.id} activity={act} />
              ))
          ) : 
          (
            <p>{mess}</p>
          )}
        </>
    );
}
