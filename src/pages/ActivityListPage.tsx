import { ReactElement, useEffect, useState } from "react";
import { BASE_URL, IActivity } from "../utils";
import { ActivityCard } from "../components/ActivityCard";
import { useParams } from "react-router-dom";
import { fetchWithToken } from "../context/FetchWithToken";


export function ActivityListPage() : ReactElement {

    const [activitiesList, setActivityList] = useState<IActivity[]>([]);
    const { moduleId } = useParams();

    
    useEffect(()=> {
            fetchActivitiesByModuleId(moduleId!);
    }, [fetchActivitiesByModuleId(moduleId!)]);

    async function fetchActivitiesByModuleId(moduleId:string) {
        try {
            const response =  await fetchWithToken(`${BASE_URL}/activities/moduleid/${moduleId}`);
            setActivityList(response);
            //const lists = await response.json();
        
            //return lists;
          } catch (error) {
            console.log(error);
            return;
          }
    }

    return(
        <>
            <p className="sub-tit"></p>
            {activitiesList && activitiesList.length > 0 ? (
            activitiesList.map((activity) => (
                <ActivityCard key={activity.id} activity={activity} />
            ))
          ) : (
            <p>No activities available.</p>
          )}
        </>
    );
}
