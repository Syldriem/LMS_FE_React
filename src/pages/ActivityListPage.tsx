import { ReactElement, useEffect, useState } from "react";
import { IActivity } from "../utils";
import { ActivityCard } from "../components/ActivityCard";
import { useParams } from "react-router-dom";


export function ActivityListPage() : ReactElement {

    const [activitiesList, setActivityList] = useState<IActivity[]>([]);
    const { moduleId } = useParams();

    
    useEffect(()=> {
        setTimeout(() => {
            fetchActivitiesByModuleId(moduleId!).then((list: IActivity[]) => {
                setActivityList(list);
            }) 
        }, 1000);
    }, [activitiesList]);


    return(
        <>
            <p className="sub-tit"></p>
            {activitiesList.map((act => (
                <ActivityCard key={act.id} activity={act} />
            )))}
        </>
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