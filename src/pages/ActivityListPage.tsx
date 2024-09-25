import { ReactElement } from "react";
import { IActivity } from "../utils";
import { ActivityCard } from "../components/ActivityCard";


interface IActivityProps {
    activitiesList : IActivity[];
}


export function ActivityListPage({activitiesList} : IActivityProps) : ReactElement {

    

    return(
        <>
            {activitiesList.map((act => (
                <ActivityCard key={act.id} activity={act} />
            )))}
        </>
    );
}