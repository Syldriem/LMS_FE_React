import { ReactElement, useEffect} from "react";
import "../css/ModuleCard.css"
import { IModules } from "../utils";
import { useProjectLogic } from "../hooks/UseProjectLogic";

interface IModulesProps {
    modules: IModules[];
    
  }

export function ModuleCard({ modules }: IModulesProps): ReactElement {
    
    const { onActivityListOpen } = useProjectLogic();
    
    const openActivitiesList = (moduleID: string) => {

        useEffect(()=> {
            return () =>{
                onActivityListOpen(moduleID);
            }
        }, []);
    }

    console.log(modules);
    return (
        <div>
        {modules ? (
            modules.map((m) => (
        <span key={m.id} className="card-src">
            <p className="title-card-src">{m.name}</p>
            <div className="desc">
                <p className="cat-lbl">Description:</p>
                <p className="spec-lbl">{m.description}</p>
            </div>
            <div className="desc">
                <p className="cat-lbl">Start Date:</p>
                <p className="spec-lbl">{m.start}</p>
            </div>
            <div className="desc">
                <p className="cat-lbl">End Date:</p>
                <p className="spec-lbl">{m.end}</p>
            </div>
            <div className="btn-container">
                <button className="btn-layout" onClick={() => openActivitiesList(m.id)}>Activities</button>
                <button className="btn-layout">Documents</button>
            </div>
        </span>
               ))
            ) : (
            <p>No Modules</p>
            )}
        </div> 
    );
}