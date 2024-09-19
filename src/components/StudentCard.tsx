import { ReactElement } from "react";
import "../css/StudentCard.css"

export function StudentCard(): ReactElement {

    
    return (
        <span className="card-st">
            <p className="title-card-src">Student Name</p>
            <div className="desc">
                <p className="cat-lbl">E-mail:</p>
                <p className="spec-lbl">mail@exmpel</p>
            </div>
            
        </span>  
    );
}